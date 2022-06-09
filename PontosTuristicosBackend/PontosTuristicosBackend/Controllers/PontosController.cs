using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PontosTuristicosBackend.DAL;
using PontosTuristicosBackend.Filter;
using PontosTuristicosBackend.Model;

namespace PontosTuristicosBackend.Controllers
{
    [ApiController]
    [Route(template:"v1")]
    public class PontosController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public PontosController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("pontos")]
        public async Task<IActionResult> Index([FromQuery] PaginationFilter filter)
        {
            var validFilter = new PaginationFilter(filter.PageNumber, filter.PageSize, filter.Search);
            if (_context.Ponto == null)
            {
                return NotFound();
            }

            var pontos = from m in _context.Ponto
                         select m;

            if (!String.IsNullOrEmpty(validFilter.Search))
            {
                pontos = pontos.Where(w => 
                    (w.Name ?? "").ToUpper().Contains(validFilter.Search) || 
                    (w.Description ?? "").ToUpper().Contains(validFilter.Search) ||
                    (w.Reference ?? "").ToUpper().Contains(validFilter.Search) ||
                    (w.State ?? "").ToUpper().Contains(validFilter.Search) ||
                    (w.City ?? "").ToUpper().Contains(validFilter.Search));
            }

            var pagedData = await pontos 
                .OrderByDescending(m => m.InsertedAt)
                .Skip(validFilter.PageNumber * validFilter.PageSize)
                .Take(validFilter.PageSize)
                .ToListAsync();

            var totalRecords = await pontos.CountAsync();
            var result = new PaginationResult(pagedData, totalRecords);
            return Ok(result);
        }

        [HttpGet]
        [Route("pontos/{id}")]
        // GET: Pontos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null || _context.Ponto == null)
            {
                return NotFound();
            }

            var ponto = await _context.Ponto
                .FirstOrDefaultAsync(m => m.Id == id);
            if (ponto == null)
            {
                return NotFound();
            }

            return Ok(ponto);
        }

        // GET: Pontos/Create
        /*public IActionResult Create()
        {
            return View();
        }*/

        // POST: Pontos/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("pontos")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Description,Reference,State,City,InsertedAt,UpdatedAt")] Ponto ponto)
        {
            if (ModelState.IsValid)
            {
                ponto.InsertedAt = DateTime.Now;
                ponto.UpdatedAt = DateTime.Now;
                _context.Add(ponto);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return Ok(ponto);
        }

        // GET: Pontos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null || _context.Ponto == null)
            {
                return NotFound();
            }

            var ponto = await _context.Ponto.FindAsync(id);
            if (ponto == null)
            {
                return NotFound();
            }
            return Ok(ponto);
        }

        // POST: Pontos/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost("pontos/{id}")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Description,Reference,State,City,InsertedAt,UpdatedAt")] Ponto ponto)
        {
            if (id != ponto.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    ponto.UpdatedAt = DateTime.Now;
                    _context.Update(ponto);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PontoExists(ponto.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return Ok(ponto);
        }

        // GET: Pontos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null || _context.Ponto == null)
            {
                return NotFound();
            }

            var ponto = await _context.Ponto
                .FirstOrDefaultAsync(m => m.Id == id);
            if (ponto == null)
            {
                return NotFound();
            }

            return Ok(ponto);
        }

        // POST: Pontos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            if (_context.Ponto == null)
            {
                return Problem("Entity set 'ApplicationDBContext.Ponto'  is null.");
            }
            var ponto = await _context.Ponto.FindAsync(id);
            if (ponto != null)
            {
                _context.Ponto.Remove(ponto);
            }
            
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PontoExists(int id)
        {
          return (_context.Ponto?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
