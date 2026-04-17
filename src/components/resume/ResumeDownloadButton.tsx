'use client'

import React from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { Download, Loader2 } from 'lucide-react'
import { ResumePDFDocument } from './ResumePDFDocument'
import { ResumeData } from '@/data/resume'
import { Role } from '@/context/RoleContext'

interface Props {
  data: ResumeData;
  activeRole: Role;
  label: string;
}

export default function ResumeDownloadButton({ data, activeRole, label }: Props) {
  return (
    <div className="group relative">
      <PDFDownloadLink
        document={<ResumePDFDocument data={data} activeRole={activeRole} activeRoleLabel={label} />}
        fileName={`Farhan_Mallik_${label.replace(/\s+/g, '_')}_Resume.pdf`}
        className="print:hidden relative px-6 py-3 bg-mech-cyan/10 border border-mech-cyan text-mech-cyan font-orbitron text-xs tracking-widest uppercase flex items-center gap-3 hover:bg-mech-cyan hover:text-mech-base transition-all duration-300 shadow-[0_0_15px_rgba(0,245,255,0.2)]"
      >
        {({ blob, url, loading, error }) =>
          loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Download PDF
            </>
          )
        }
      </PDFDownloadLink>
      
      {/* Filename Preview Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-mech-base border border-mech-cyan/30 rounded text-[9px] font-share-mono text-mech-cyan opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-glow-sm">
        <div className="flex flex-col items-center">
            <span className="text-mech-silver/40 text-[7px] uppercase mb-0.5 tracking-tighter text-center">Protocol_Output_Manifest</span>
            <span>Farhan_Mallik_{label.replace(/\s+/g, '_')}_Resume.pdf</span>
        </div>
      </div>
    </div>
  )
}
