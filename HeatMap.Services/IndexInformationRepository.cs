using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeatMap.Domains;
using MyNoSqlServerClient;

namespace HeatMap.Services
{
    
    public class IndexAssetInfo : IIndexAssetInfo
    {
        public string AssetId { get; set; }
        public double Weight { get; set; }
        public double Price { get; set; }
        public bool IsDisabled { get; set; }

        public static IndexAssetInfo Create(IIndexAssetInfo src)
        {
            return new IndexAssetInfo
            {
                AssetId = src.AssetId,
                Price = src.Price,
                Weight = src.Weight,
                IsDisabled = src.IsDisabled
            };
        }
    }
    public class IndexInformationTableEntity : MyNoSqlTableEntity, IIndexInformation
    {

        public static string GeneratePartitionKey()
        {
            return "IndexInfo";
        }
        
        public static string GenerateRowKey(string assetId)
        {
            return assetId;
        }        
        
        public string Source { get; set; }
        public string AssetPair => RowKey;
        public double Bid { get; set; }
        public double Ask { get; set; }
        DateTime IIndexInformation.Timestamp => DateTime.Parse(Timestamp);
        
        public IndexAssetInfo[] AssetsInfo { get; set; }
        IEnumerable<IIndexAssetInfo> IIndexInformation.AssetsInfo => AssetsInfo;


        public static IndexInformationTableEntity Create(IIndexInformation src)
        {
            return new IndexInformationTableEntity
            {
                PartitionKey = GeneratePartitionKey(),
                RowKey = GenerateRowKey(src.AssetPair),
                Source = src.Source,
                Ask = src.Ask,
                Bid = src.Bid,
                Timestamp = src.Timestamp.ToString("O"),
                AssetsInfo = src.AssetsInfo.Select(IndexAssetInfo.Create).ToArray()
            };
        }
    }
    
    public class IndexInformationRepository : IIndexInformationRepository
    {
        private readonly IMyNoSqlServerClient<IndexInformationTableEntity> _dbTable;

        public IndexInformationRepository(IMyNoSqlServerClient<IndexInformationTableEntity> dbTable)
        {
            _dbTable = dbTable;
        }
        
        public async ValueTask UpdateAsync(IIndexInformation data)
        {
            var newEntity = IndexInformationTableEntity.Create(data);
            await _dbTable.InsertOrReplaceAsync(newEntity);
        }
    }
}