using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HeatMap.Domains;
using HeatMap.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeatMap.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController: ControllerBase
    {
        private readonly IBidAskCache _bidAskCache;
        private readonly IBidAskHistoryRepository _bidAskHistoryRepository;


        public DataController(IBidAskCache bidAskCache, IBidAskHistoryRepository bidAskHistoryRepository)
        {
            _bidAskCache = bidAskCache;
            _bidAskHistoryRepository = bidAskHistoryRepository;
        }


        private static IEnumerable<AssetDataContract> AssembleResult(IEnumerable<IBidAsk> bidAsks, IEnumerable<IBidAskHistory> bidAskHistory)
        {
            var assets = AssetContract.GetMockResult();

            var rates = bidAsks.ToDictionary(itm => itm.Id);
            var historyDictionary = bidAskHistory.ToDictionary(itm => itm.Id);

            foreach (var asset in assets)
            {
                if (rates.ContainsKey(asset.Id))
                {
                    var hist = historyDictionary.ContainsKey(asset.Id)
                        ? historyDictionary[asset.Id].History
                        : Array.Empty<double>();
                    
                    yield return AssetDataContract.Create(asset.Id, rates[asset.Id].GetMid(), hist);
                }
            }
            
        }
        

        [HttpGet]
        public  async Task<IEnumerable<AssetDataContract>> Get()
        {
            var bidAsks = _bidAskCache.GetProfile();
            var bidAskHistory = await _bidAskHistoryRepository.GetAllAsync();
            return AssembleResult(bidAsks, bidAskHistory);
            
            
        }
        
    }
}