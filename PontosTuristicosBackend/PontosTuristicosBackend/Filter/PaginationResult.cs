namespace PontosTuristicosBackend.Filter
{
    public class PaginationResult
    {
        public Object? Data { get; set; }
        public int Count { get; set; }
        public PaginationResult()
        {
            this.Data = null;
            this.Count = 0;
        }
        public PaginationResult(Object? data, int count)
        {
            this.Data = data;
            this.Count = count;
        }
    }
}
