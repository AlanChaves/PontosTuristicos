using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PontosTuristicosBackend.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
namespace PontosTuristicosBackend.DAL
{
    public class ApplicationDBContext : DbContext
    {
        public DbSet<Ponto> Ponto { get; set; }
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }
    }
}