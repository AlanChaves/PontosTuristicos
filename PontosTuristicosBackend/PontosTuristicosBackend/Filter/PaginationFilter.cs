namespace PontosTuristicosBackend.Filter
{
    public class PaginationFilter
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public String Search { get; set; }
        public PaginationFilter()
        {
            this.PageNumber = 0;
            this.PageSize = 3;
            this.Search = "";
        }
        public PaginationFilter(int pageNumber, int pageSize, String search)
        {
            this.PageNumber = pageNumber < 0 ? 0 : pageNumber;
            this.PageSize = pageSize > 10 ? 10 : pageSize;
            this.Search = search.ToUpper();
        }
    }
}
