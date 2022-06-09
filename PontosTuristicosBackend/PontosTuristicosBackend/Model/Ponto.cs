
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace PontosTuristicosBackend.Model
{
    public class Ponto
    {
        public int Id { get; set; }
        public String? Name { get; set; }
        public String? Description { get; set; }
        public String? Reference { get; set; }
        public String? State { get; set; }
        public String? City { get; set; }
        public DateTime InsertedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public bool Exists(String? search)
        {
            if (search == null || search == "")
            {
                return true;
            }

            if (Name != null)
            {
                if (Name.Contains(search))
                {
                    return true;
                }
            }

            if (Description != null)
            {
                if (Description.Contains(search))
                {
                    return true;
                }
            }

            if (Reference != null)
            {
                if (Reference.Contains(search))
                {
                    return true;
                }
            }

            if (State != null)
            {
                if (State.Contains(search))
                {
                    return true;
                }
            }

            if (City != null)
            {
                if (City.Contains(search))
                {
                    return true;
                }
            }

            return false;
        }

    }
}