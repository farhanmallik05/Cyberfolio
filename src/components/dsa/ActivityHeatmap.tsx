'use client'

import { motion } from 'framer-motion'
import { HeatmapDay } from '@/data/dsa'

interface Props {
  data: HeatmapDay[];
  lastSynced: string;
}

export default function ActivityHeatmap({ data, lastSynced }: Props) {
  // Group into weeks (rows: 7 days, cols: ~52 weeks)
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  const levels = {
    0: 'bg-mech-base/40',
    1: 'bg-mech-cyan/10',
    2: 'bg-mech-cyan/30',
    3: 'bg-mech-cyan/60',
    4: 'bg-mech-cyan shadow-[0_0_10px_rgba(0,245,255,0.4)]'
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="mb-12 p-6 bg-mech-panel/20 border border-mech-cyan/10 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-mech-cyan" />
          <h3 className="font-orbitron font-bold text-sm tracking-[0.2em] text-mech-white uppercase">
            Neural Contribution Grid
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-mech-cyan animate-pulse" />
          <span className="font-share-mono text-[9px] text-mech-silver/40 uppercase tracking-widest whitespace-nowrap">
            Last Synced: {new Date(lastSynced).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Month labels */}
        <div className="flex mb-2 ml-8 font-share-mono text-[8px] text-mech-silver/20 uppercase">
          {months.map((m, i) => (
            <div key={m} className={`flex-1 ${i === 0 ? '' : 'text-center'}`}>{m}</div>
          ))}
        </div>

        <div className="flex gap-1.5">
          {/* Day labels */}
          <div className="flex flex-col justify-between py-1 font-share-mono text-[8px] text-mech-silver/20 uppercase w-6 shrink-0">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>

          {/* Grid Scroll Wrapper */}
          <div className="flex-1 overflow-x-auto overflow-y-hidden pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1">
                  {week.map((day, dIdx) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (wIdx * 7 + dIdx) * 0.001 }}
                      className={`w-3 h-3 rounded-[2px] ${levels[day.level as keyof typeof levels]} hover:brightness-125 transition-all cursor-crosshair relative group`}
                    >
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-mech-base border border-mech-cyan/20 rounded text-[8px] font-share-mono text-mech-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                        {day.date}: {day.count} sub.
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 flex items-center justify-end gap-3 px-2">
        <span className="font-share-mono text-[9px] md:text-[10px] text-mech-silver/60 uppercase tracking-widest mr-2">Intensity:</span>
        <div className="flex items-center gap-2">
          <span className="font-share-mono text-[8px] md:text-[9px] text-mech-silver/50 uppercase">Less</span>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map(l => (
              <div key={l} className={`w-3 h-3 rounded-[1px] ${levels[l as keyof typeof levels]}`} />
            ))}
          </div>
          <span className="font-share-mono text-[8px] md:text-[9px] text-mech-silver/50 uppercase">More</span>
        </div>
      </div>
    </div>
  )
}
