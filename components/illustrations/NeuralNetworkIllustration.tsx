
import React, { useState, useEffect } from 'react';

export const NeuralNetworkIllustration = () => {
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);

  const layers = [3, 4, 4, 2]; // Number of nodes in each layer

  const triggerPulse = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Sequential activation simulation
    let currentLayer = 0;
    
    const animateLayer = (layerIndex: number) => {
        if (layerIndex >= layers.length) {
            setTimeout(() => {
                setActiveNodes(new Set());
                setIsAnimating(false);
            }, 500);
            return;
        }

        const newActiveNodes = new Set<string>();
        // Activate nodes in this layer
        for(let i=0; i<layers[layerIndex]; i++) {
             newActiveNodes.add(`${layerIndex}-${i}`);
        }
        
        setActiveNodes(prev => {
            const combined = new Set(prev);
            newActiveNodes.forEach(n => combined.add(n));
            return combined;
        });

        // Turn off previous layer after a delay to simulate passing through
        if (layerIndex > 0) {
             setTimeout(() => {
                setActiveNodes(prev => {
                    const next = new Set(prev);
                    for(let i=0; i<layers[layerIndex-1]; i++) {
                        next.delete(`${layerIndex-1}-${i}`);
                    }
                    return next;
                });
             }, 400);
        }

        setTimeout(() => animateLayer(layerIndex + 1), 400);
    };

    animateLayer(0);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        className="relative w-full h-[250px] bg-slate-900/50 rounded-xl border border-slate-700 mb-4 overflow-hidden cursor-pointer group"
        onClick={triggerPulse}
      >
         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            <span className="bg-slate-800/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-slate-600">Kattints az indításhoz!</span>
         </div>

         <svg className="w-full h-full p-4">
            {/* Connections */}
            {layers.map((nodeCount, layerIndex) => {
                if (layerIndex === layers.length - 1) return null;
                const nextLayerCount = layers[layerIndex + 1];
                
                const connections = [];
                for (let i = 0; i < nodeCount; i++) {
                    for (let j = 0; j < nextLayerCount; j++) {
                        const isActive = activeNodes.has(`${layerIndex}-${i}`) && activeNodes.has(`${layerIndex+1}-${j}`); // Simplified visual logic
                        const isSourceActive = activeNodes.has(`${layerIndex}-${i}`);
                        
                        // Calculate positions based on percentage
                        const x1 = `${(layerIndex / (layers.length - 1)) * 100}%`;
                        const y1 = `${((i + 1) / (nodeCount + 1)) * 100}%`;
                        const x2 = `${((layerIndex + 1) / (layers.length - 1)) * 100}%`;
                        const y2 = `${((j + 1) / (nextLayerCount + 1)) * 100}%`;

                        connections.push(
                            <line 
                                key={`conn-${layerIndex}-${i}-${j}`}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke={isSourceActive ? '#38bdf8' : '#334155'}
                                strokeWidth={isSourceActive ? 2 : 1}
                                className="transition-all duration-300"
                                strokeOpacity={isSourceActive ? 0.8 : 0.3}
                            />
                        );
                    }
                }
                return connections;
            })}

            {/* Nodes */}
            {layers.map((nodeCount, layerIndex) => {
                 return Array.from({ length: nodeCount }).map((_, nodeIndex) => {
                    const isActive = activeNodes.has(`${layerIndex}-${nodeIndex}`);
                    const x = `${(layerIndex / (layers.length - 1)) * 100}%`;
                    const y = `${((nodeIndex + 1) / (nodeCount + 1)) * 100}%`;
                    
                    return (
                        <circle 
                            key={`node-${layerIndex}-${nodeIndex}`}
                            cx={x} cy={y} r={isActive ? 8 : 5}
                            fill={isActive ? '#38bdf8' : '#1e293b'}
                            stroke={isActive ? '#bae6fd' : '#475569'}
                            strokeWidth="2"
                            className="transition-all duration-300 ease-out"
                        />
                    );
                 });
            })}
         </svg>
      </div>
      <div className="flex justify-between w-full text-xs text-slate-400 px-4">
        <span>Bemeneti réteg</span>
        <span>Rejtett rétegek</span>
        <span>Kimenet</span>
      </div>
    </div>
  );
};
