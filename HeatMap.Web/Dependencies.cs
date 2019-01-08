using System;
using Common;
using Microsoft.Extensions.DependencyInjection;

namespace HeatMap.Web
{
    public class DependencyResolver : IDependencyResolver, IDependencyCollection
    {
        private readonly IServiceCollection _serviceCollection;

        private ServiceProvider _serviceProvider;


        public DependencyResolver(IServiceCollection serviceCollection)
        {
            _serviceCollection = serviceCollection;
        }

        public T GetService<T>()
        {
            if (_serviceProvider == null)
                _serviceProvider = _serviceCollection.BuildServiceProvider();
            
            var srv = _serviceProvider.GetRequiredService<T>();

            if (srv == null)
                throw new Exception("Service " + typeof(T) + " is not registered to Service collection");

            return srv;

        }

        public void AddSingleton<TService, TImplementation>() where TService : class where TImplementation : class, TService
        {
            _serviceCollection.AddSingleton<TService, TImplementation>();
        }

        public void AddSingleton<TService, TImplementation>(TImplementation instance) where TService : class where TImplementation : class, TService
        {
            _serviceCollection.AddSingleton<TService>(instance);
        }

    }
}