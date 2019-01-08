using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;

namespace MyNoSqlServerClient
{
    public class MyNoSqlServerClient<T> : IMyNoSqlServerClient<T> where T: IMyNoSqlTableEntity, new()
    {
        private readonly string _url;
        private readonly string _tableName;

        public MyNoSqlServerClient(string url, string tableName)
        {
            _url = url;
            _tableName = tableName;
            Task.Run(CreateTableIfNotExistsAsync);
        }

        private async Task CreateTableIfNotExistsAsync()
        {
            await _url
                .AppendPathSegments("Tables", "CreateIfNotExists")
                .SetQueryParam("tableName", _tableName)
                .PostStringAsync(string.Empty);
        }

        public async Task InsertAsync(T entity)
        {
            await _url
                .AppendPathSegments("Row", "Insert")
                .SetQueryParam("tableName", _tableName)
                .PostJsonAsync(entity);
        }

        public async Task InsertOrReplaceAsync(T entity)
        {
            await _url
                .AppendPathSegments("Row", "InsertOrReplace")
                .SetQueryParam("tableName", _tableName)
                .PostJsonAsync(entity);
        }
        

        public async Task<IEnumerable<T>> GetAsync(string partitionKey)
        {
            return await _url
                .AppendPathSegments("Row")
                .SetQueryParam("tableName", _tableName)
                .SetQueryParam("partitionKey", partitionKey)                
                .GetAsync()
                .ReadAsJsonAsync<T[]>();
        }

        public async Task<T> GetAsync(string partitionKey, string rowKey)
        {

            var response = await _url
                .AppendPathSegments("Row")
                .SetQueryParam("tableName", _tableName)
                .SetQueryParam("partitionKey", partitionKey)
                .SetQueryParam("rowKey", rowKey)
                .AllowHttpStatus(HttpStatusCode.NotFound)
                .GetAsync();


            if (response.StatusCode == HttpStatusCode.NotFound)
                return default(T);

            return await response.ReadAsJsonAsync<T>();

        }

    }

    public static class MyNoSqlServerClientExt
    {
        
        public static async Task<T> ReadAsJsonAsync<T>(this Task<HttpResponseMessage> responseTask)
        {
            var response = await responseTask;
            return await response.ReadAsJsonAsync<T>();
        }
        
        public static async Task<T> ReadAsJsonAsync<T>(this HttpResponseMessage response)
        {
            var json = await response.Content.ReadAsStringAsync();
            return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(json);
        }
        
    }
    
}