import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import LinkManager from '../../core/linking/LinkManager';
import { useTranslation } from '../../locales/i18n';

const KnowledgeGraph: React.FC = () => {
  const { t } = useTranslation();
  const graphRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (graphRef.current) {
      const graphData = LinkManager.getInstance().generateGraphData();
      renderGraph(graphData);
    }
  }, []);

  const renderGraph = (data: { nodes: any[], links: any[] }) => {
    const width = 800;
    const height = 600;
    
    const svg = d3.select(graphRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));
    
    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);
    
    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('r', 10)
      .attr('fill', '#4361ee')
      .call(d3.drag() as any);
    
    const label = svg.append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .text((d: any) => d.name)
      .attr('font-family', 'Noto Sans Arabic')
      .attr('font-size', 12)
      .attr('dx', 12)
      .attr('dy', 4);
    
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      
      node
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
      
      label
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t('graph.title')}</h2>
      <div ref={graphRef} className="border rounded-lg bg-white p-4"></div>
    </div>
  );
};

export default KnowledgeGraph;