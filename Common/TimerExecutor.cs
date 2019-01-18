using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Common
{
    public interface ITimerExecutor
    {
        ValueTask TimerIterationAsync();
    }

    public class TimerExecutor
    {
        private readonly int _periodMs;



        private readonly List<(string name, ITimerExecutor timerExecutor)> _timerExecutors =
            new List<(string name, ITimerExecutor timerExecutor)>();

        public TimerExecutor(int periodMs, params (string name, ITimerExecutor timerExecutor)[] timerExecutors)
        {

            _periodMs = periodMs;

            RegisterTimers(timerExecutors);

        }

        public TimerExecutor RegisterTimers(params (string name, ITimerExecutor timerExecutor)[] timerExecutors)
        {
            _timerExecutors.AddRange(timerExecutors);
            return this;
        }

        public TimerExecutor RegisterTimer(string name, ITimerExecutor timerExecutor)
        {
            _timerExecutors.Add((name, timerExecutor));
            return this;
        }


        private static readonly object LockObject = new object();
        public bool Working { get; private set; }

        private static void LogError(string componentName, Exception exception)
        {
            Console.WriteLine($"{DateTime.UtcNow}: {componentName}: {exception.Message}");
        }


        private async Task ThreadMethod()
        {
            while (Working)
            {

                try
                {
                    foreach (var (name, timerExecutor) in _timerExecutors)
                    {
                        try
                        {
                            await timerExecutor.TimerIterationAsync();
                        }
                        catch (Exception exception)
                        {
                            LogError(name, exception);
                        }
                    }

                }
                catch (Exception e)
                {
                    LogError("RootLoop: ", e);
                }
                finally
                {
                    await Task.Delay(_periodMs);
                }
            }
        }



        public virtual void Start()
        {
            lock (LockObject)
            {
                if (Working)
                    return;

                Working = true;
                Task.Run(async () => { await ThreadMethod(); });

            }
        }

        public void Stop()
        {
            Working = false;
        }

    }
}