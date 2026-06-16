import React from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { Property } from '../types';
import { formatCurrencyText } from './PropertySearchAndList';

interface CompareModalProps {
  compareIds: string[];
  properties: Property[];
  onRemove: (id: string) => void;
  onClose: () => void;
  onEnquireClick: (property: Property) => void;
}

export default function CompareModal({
  compareIds,
  properties,
  onRemove,
  onClose,
  onEnquireClick
}: CompareModalProps) {
  // Map ids to full property objects
  const selectedProperties = properties.filter((p) => compareIds.includes(p.id));

  return (
    <div
      id="eep-compare-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto border border-zinc-100 dark:border-zinc-800 shadow-2xl relative p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Head Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
          <div>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block font-mono">
              Intelligence Engine
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white">
              Property Specifications Comparison
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {selectedProperties.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Your comparison speculative list is empty. Click the circular double-arrow icon (⇅) on any property card to select it for live parameters verification.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-bold uppercase rounded-lg"
            >
              Back to Catalog
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Table layout / Grid column view based on size */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-zinc-700 dark:text-zinc-300">
                <thead>
                  <tr className="border-b border-zinc-100 dark:border-zinc-800">
                    <th className="py-4 px-4 font-bold uppercase text-[10px] text-zinc-400 font-mono tracking-wider w-1/4">
                      Parameters Specs
                    </th>
                    {selectedProperties.map((prop) => (
                      <th
                        key={prop.id}
                        className="py-4 px-4 font-bold text-zinc-900 dark:text-white w-1/4 min-w-[200px]"
                      >
                        <div className="flex flex-col space-y-2">
                          <div className="h-28 rounded-lg overflow-hidden relative">
                            <img src={prop.images[0]} className="w-full h-full object-cover" alt="" />
                            <button
                              onClick={() => onRemove(prop.id)}
                              className="absolute top-2 right-2 p-1.5 bg-rose-600 rounded-full text-white shadow hover:scale-105 transition-transform"
                              title="Delete from list"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-xs text-amber-500 uppercase tracking-widest font-mono block">
                            {prop.type}
                          </span>
                          <span className="font-bold text-sm block line-clamp-1">{prop.title}</span>
                        </div>
                      </th>
                    ))}
                    {/* Empty slots placeholders if count is less than 3 */}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => (
                        <th key={i} className="py-4 px-4 w-1/4 text-center border-dashed border border-zinc-200 dark:border-zinc-800 rounded-lg opacity-40">
                          <span className="text-xs text-zinc-400">Empty Comparison Slot</span>
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-light">
                  {/* Price Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider">
                      Premium Investment
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4 font-bold text-amber-600 dark:text-amber-400 font-mono">
                        {formatCurrencyText(prop.price)}
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Area Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 id-label uppercase text-[10px] tracking-wider">
                      Total Lot Size
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4 font-regular font-mono text-xs">
                        {prop.area.toLocaleString('en-IN')} Sq.Ft
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Plot Dimensions Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider">
                      Plot Width Specs
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4 font-medium text-xs">
                        {prop.plotSize || 'N/A / Standard'}
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Facing Orientation Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider">
                      Facing Direction
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4 text-xs font-regular">
                        {prop.facing || 'East Facing'}
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Rooms layout BHK Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider">
                      Rooms Layout (BHK)
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4 text-xs font-medium">
                        {prop.bedrooms ? `${prop.bedrooms} BHK (${prop.bathrooms} Bath)` : 'Commercial Land / Empty Plot'}
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Physical Coordinates Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider">
                      Geographical Zone
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4 text-xs">
                        {prop.location}
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Security Verification status Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider">
                      Legal Compliance
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4">
                        {prop.verified ? (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded inline-flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5" /> 100% VERIFIED
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-400">Under Examination</span>
                        )}
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Active Registry Status Row */}
                  <tr>
                    <td className="py-4 px-4 font-semibold text-zinc-800 dark:text-zinc-200 uppercase text-[10px] tracking-wider">
                      Mutation Status
                    </td>
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-4 px-4">
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                          prop.status === 'available' ? 'bg-amber-500 text-zinc-950' :
                          prop.status === 'reserved' ? 'bg-sky-500 text-white' : 'bg-rose-500 text-white'
                        }`}>
                          {prop.status}
                        </span>
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4 text-center text-zinc-400">-</td>)}
                  </tr>

                  {/* Quick trigger Actions checkout bar */}
                  <tr className="border-t-2 border-zinc-100 dark:border-zinc-800">
                    <td className="py-4 px-4" />
                    {selectedProperties.map((prop) => (
                      <td key={prop.id} className="py-6 px-4">
                        <button
                          onClick={() => {
                            onEnquireClick(prop);
                            onClose();
                          }}
                          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold uppercase tracking-wider text-[10px] rounded-md shadow-sm transition-all flex items-center justify-center space-x-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Acquire Brief</span>
                        </button>
                      </td>
                    ))}
                    {selectedProperties.length < 3 &&
                      Array.from({ length: 3 - selectedProperties.length }).map((_, i) => <td key={i} className="py-4 px-4" />)}
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest pt-2">
              All listed real estates are fully mapped under RERA provisions. Direct deal mutation desk active.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
