using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyNoSqlServerClient
{
    public interface IMyNoSqlTableEntity
    {
        string PartitionKey { get; set; }
        string RowKey { get; set; }
        string Timestamp { get; set; }
    }

    public class MyNoSqlTableEntity : IMyNoSqlTableEntity
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public string Timestamp { get; set; }
    }

    public interface IMyNoSqlServerClient<T> where T : IMyNoSqlTableEntity, new()
    {
        Task InsertAsync(T entity);
        Task InsertOrReplaceAsync(T entity);
        Task BulkInsertOrReplaceAsync(IEnumerable<T> entity);

        Task<IEnumerable<T>> GetAsync(string partitionKey);
        Task<T> GetAsync(string partitionKey, string rowKey);

    }

}