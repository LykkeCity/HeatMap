using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HeatMap.Domains;
using Common;

namespace HeatMap.Services
{

    public class BidAskCache : IBidAskCache, ITimerExecutor
    {
        private readonly IBidAskRepository _bidAskRepository;

        public BidAskCache(IBidAskRepository bidAskRepository)
        {
            _bidAskRepository = bidAskRepository;
        }

        private IBidAsk[] _profile =  Array.Empty<IBidAsk>();

        public IEnumerable<IBidAsk> GetProfile()
        {
            return _profile;
        }

        public async ValueTask TimerIterationAsync()
        {
            _profile = await _bidAskRepository.GetAllAsync().ToArrayAsync();
        }
        
    }
}