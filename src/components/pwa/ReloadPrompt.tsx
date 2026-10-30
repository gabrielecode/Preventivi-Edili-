import React from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { RefreshCw, X } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export const ReloadPrompt: React.FC = () => {
  const location = useLocation()
  
  // Never show the prompt in the middle of an estimate
  const isCurrentlyInWizard = location.pathname === '/stima'

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r)
    },
    onRegisterError(error) {
      console.log('SW registration error', error)
    },
  })

  const close = () => {
    setOfflineReady(false)
    setNeedRefresh(false)
  }

  if (isCurrentlyInWizard) return null
  if (!offlineReady && !needRefresh) return null

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-xl shrink-0 ${needRefresh ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
            <RefreshCw className={`w-5 h-5 ${needRefresh ? 'animate-spin-slow' : ''}`} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900">
              {needRefresh ? 'Aggiornamento disponibile' : 'App pronta per l\'uso offline'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              {needRefresh 
                ? 'Una nuova versione dell\'app è pronta. Aggiorna ora per le ultime funzionalità.'
                : 'Puoi continuare a consultare l\'app anche senza connessione internet.'}
            </p>
            
            <div className="flex items-center gap-3 mt-4">
              {needRefresh && (
                <button
                  type="button"
                  onClick={() => updateServiceWorker(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
                >
                  Aggiorna ora
                </button>
              )}
              <button
                type="button"
                onClick={close}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
              >
                {needRefresh ? 'Più tardi' : 'Chiudi'}
              </button>
            </div>
          </div>

          <button 
            type="button" 
            onClick={close}
            className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
