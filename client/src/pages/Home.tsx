/*
 * DESIGN: Blueprint Finance
 * Dark navy (#0A0F1E) + Cyan (#00B4D8) + Emerald (#06D6A0)
 * Space Grotesk (headings) + DM Sans (body) + Space Mono (data)
 * Financial terminal aesthetic, data-first, interactive charts
 */

import { useState, useEffect, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Legend, Cell
} from "recharts";

// ─── DATA ────────────────────────────────────────────────────────────────────

const taxasHistoricas = [
  { mes: "Jan/23", taxa: 5.80 }, { mes: "Mar/23", taxa: 5.90 },
  { mes: "Mai/23", taxa: 5.75 }, { mes: "Jul/23", taxa: 5.85 },
  { mes: "Set/23", taxa: 6.10 }, { mes: "Nov/23", taxa: 5.95 },
  { mes: "Jan/24", taxa: 6.20 }, { mes: "Mar/24", taxa: 6.05 },
  { mes: "Mai/24", taxa: 6.15 }, { mes: "Jul/24", taxa: 6.30 },
  { mes: "Set/24", taxa: 6.45 }, { mes: "Nov/24", taxa: 6.80 },
  { mes: "Jan/25", taxa: 7.53 }, { mes: "Mar/25", taxa: 7.20 },
  { mes: "Mai/25", taxa: 6.90 }, { mes: "Jul/25", taxa: 7.10 },
  { mes: "Set/25", taxa: 7.30 }, { mes: "Nov/25", taxa: 7.15 },
  { mes: "Jan/26", taxa: 7.05 },
];

const assimetriaData = [
  { cenario: "Taxa +2pp\n(IPCA+9%)", retorno: -25, label: "-25%" },
  { cenario: "Taxa +1pp\n(IPCA+8%)", retorno: -8, label: "-8%" },
  { cenario: "Taxa estável\n(IPCA+7%)", retorno: 22, label: "+22%" },
  { cenario: "Taxa -1pp\n(IPCA+6%)", retorno: 55, label: "+55%" },
  { cenario: "Taxa -2pp\n(IPCA+5%)", retorno: 92, label: "+92%" },
  { cenario: "Taxa -3pp\n(IPCA+4%)", retorno: 135, label: "+135%" },
];

const cenariosCurvas = [
  { ano: 0, ipca4: 0, ipca5: 0, ipca6: 0, ipca7: 0, ipca8: 0, ipca9: 0 },
  { ano: 1, ipca4: 3.2, ipca5: 1.8, ipca6: 0.5, ipca7: -1.2, ipca8: -3.5, ipca9: -5.8 },
  { ano: 2, ipca4: 8.5, ipca5: 5.2, ipca6: 1.8, ipca7: -2.1, ipca8: -6.8, ipca9: -11.5 },
  { ano: 3, ipca4: 15.2, ipca5: 10.8, ipca6: 5.5, ipca7: -0.5, ipca8: -8.2, ipca9: -15.8 },
];

const ipcaData = [
  { ano: "2000", ipca: 5.97, meta: 6.0, sup: 8.0, inf: 4.0 },
  { ano: "2001", ipca: 7.67, meta: 4.0, sup: 6.0, inf: 2.0 },
  { ano: "2002", ipca: 12.53, meta: 3.5, sup: 5.5, inf: 1.5 },
  { ano: "2003", ipca: 9.30, meta: 3.5, sup: 5.5, inf: 1.5 },
  { ano: "2004", ipca: 7.60, meta: 3.5, sup: 5.5, inf: 1.5 },
  { ano: "2005", ipca: 5.69, meta: 5.0, sup: 7.0, inf: 3.0 },
  { ano: "2006", ipca: 3.14, meta: 4.5, sup: 6.5, inf: 2.5 },
  { ano: "2007", ipca: 4.46, meta: 4.5, sup: 6.5, inf: 2.5 },
  { ano: "2008", ipca: 5.90, meta: 4.5, sup: 6.5, inf: 2.5 },
  { ano: "2009", ipca: 4.31, meta: 4.0, sup: 5.5, inf: 2.5 },
  { ano: "2010", ipca: 5.91, meta: 4.5, sup: 6.5, inf: 2.5 },
  { ano: "2011", ipca: 6.50, meta: 5.0, sup: 6.5, inf: 3.5 },
  { ano: "2012", ipca: 5.84, meta: 5.0, sup: 6.5, inf: 3.5 },
  { ano: "2013", ipca: 5.91, meta: 5.0, sup: 6.5, inf: 3.5 },
  { ano: "2014", ipca: 6.41, meta: 5.0, sup: 6.5, inf: 3.5 },
  { ano: "2015", ipca: 10.67, meta: 5.0, sup: 6.5, inf: 3.5 },
  { ano: "2016", ipca: 6.29, meta: 5.0, sup: 6.5, inf: 3.5 },
  { ano: "2017", ipca: 2.95, meta: 3.0, sup: 4.5, inf: 1.5 },
  { ano: "2018", ipca: 3.75, meta: 3.0, sup: 4.5, inf: 1.5 },
  { ano: "2019", ipca: 4.31, meta: 4.0, sup: 5.5, inf: 2.5 },
  { ano: "2020", ipca: 4.52, meta: 4.0, sup: 5.5, inf: 2.5 },
  { ano: "2021", ipca: 10.06, meta: 3.5, sup: 5.25, inf: 1.75 },
  { ano: "2022", ipca: 5.79, meta: 3.25, sup: 5.0, inf: 1.5 },
  { ano: "2023", ipca: 4.62, meta: 3.25, sup: 4.75, inf: 1.75 },
  { ano: "2024", ipca: 4.83, meta: 3.0, sup: 4.5, inf: 1.5 },
  { ano: "2025", ipca: 4.83, meta: 3.0, sup: 4.5, inf: 1.5 },
];

const titulosDisponiveis = [
  { vencimento: 2030, taxa: 7.15, label: "Tesouro Renda+ 2030" },
  { vencimento: 2035, taxa: 7.05, label: "Tesouro Renda+ 2035" },
  { vencimento: 2040, taxa: 6.95, label: "Tesouro Renda+ 2040" },
  { vencimento: 2045, taxa: 6.83, label: "Tesouro Renda+ 2045" },
  { vencimento: 2050, taxa: 6.72, label: "Tesouro Renda+ 2050" },
  { vencimento: 2055, taxa: 6.61, label: "Tesouro Renda+ 2055" },
  { vencimento: 2060, taxa: 6.50, label: "Tesouro Renda+ 2060" },
  { vencimento: 2065, taxa: 6.40, label: "Tesouro Renda+ 2065" },
];

const cenariosMacro = [
  {
    nome: "Melhora Fiscal",
    descricao: "Pais reduz deficit, inflacao cai",
    taxaInicial: 7.05,
    taxaFinal: 4.0,
    cor: "#06D6A0",
    label: "Taxa recua para IPCA+4%",
  },
  {
    nome: "Cenario Base",
    descricao: "Estabilidade macroeconomica",
    taxaInicial: 7.05,
    taxaFinal: 7.05,
    cor: "#00B4D8",
    label: "Taxa se mantem",
  },
  {
    nome: "Piora Fiscal",
    descricao: "Deficit aumenta, inflacao sobe",
    taxaInicial: 7.05,
    taxaFinal: 9.0,
    cor: "#EF476F",
    label: "Taxa sobe para IPCA+9%",
  },
];

function calcularCenario(aporteInicial: number, aporteMensal: number, anos: number, taxaInicial: number, taxaFinal: number) {
  const taxaMensalInicial = Math.pow(1 + taxaInicial / 100, 1 / 12) - 1;
  const taxaMensalFinal = Math.pow(1 + taxaFinal / 100, 1 / 12) - 1;
  const nMeses = anos * 12;
  const metadeNMeses = nMeses / 2;

  const vfInicial1 = aporteInicial * Math.pow(1 + taxaMensalInicial, metadeNMeses);
  const vfMensal1 = aporteMensal * ((Math.pow(1 + taxaMensalInicial, metadeNMeses) - 1) / taxaMensalInicial);
  const vfMeio = vfInicial1 + vfMensal1;

  const vfInicial2 = vfMeio * Math.pow(1 + taxaMensalFinal, metadeNMeses);
  const vfMensal2 = aporteMensal * ((Math.pow(1 + taxaMensalFinal, metadeNMeses) - 1) / taxaMensalFinal);
  const vfFinal = vfInicial2 + vfMensal2;

  const rendaMensal = vfFinal * taxaMensalFinal / (1 - Math.pow(1 + taxaMensalFinal, -240));
  const rendaLiquida = rendaMensal * 0.85;

  return { patrimonio: vfFinal, renda: rendaLiquida };
}

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function useIntersectionObserver(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

// ─── CUSTOM TOOLTIP ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label, unit = "%" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bp-card p-3 text-sm">
        <p className="bp-ticker mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: <span className="font-mono">{p.value}{unit}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function StatCard({ value, label, suffix = "%", color = "cyan", delay = 0 }: {
  value: number; label: string; suffix?: string; color?: "cyan" | "emerald" | "gold" | "coral"; delay?: number;
}) {
  const { ref, isVisible } = useIntersectionObserver();
  const count = useCountUp(value, 1500, isVisible);
  const colorMap = {
    cyan: "text-[#00B4D8]",
    emerald: "text-[#06D6A0]",
    gold: "text-[#FFB703]",
    coral: "text-[#EF476F]",
  };
  return (
    <div ref={ref} className="bp-card p-6 text-center" style={{ animationDelay: `${delay}ms` }}>
      <div className={`text-4xl font-bold bp-stat-number ${colorMap[color]}`}>
        {count}{suffix}
      </div>
      <p className="text-[#94A3B8] text-sm mt-2 font-medium">{label}</p>
    </div>
  );
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10">
      <span className="bp-badge-neutral mb-3 inline-block">{tag}</span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {title}
      </h2>
      {subtitle && <p className="text-[#94A3B8] text-lg max-w-2xl">{subtitle}</p>}
    </div>
  );
}

function ComparadorAssimetriaGanho() {
  const [tituloBase, setTituloBase] = useState(3);
  const [taxaMercado, setTaxaMercado] = useState(9);
  const aporteInicial = 100000;
  const aporteMensal = 2000;
  const anos = 20;

  const taxaBase = titulosDisponiveis[tituloBase].taxa;
  const diferencialTaxa = taxaMercado - taxaBase;

  const calcularRetorno = (taxa: number) => {
    const taxaMensal = Math.pow(1 + taxa / 100, 1 / 12) - 1;
    const nMeses = anos * 12;
    const vfIni = aporteInicial * Math.pow(1 + taxaMensal, nMeses);
    const vfMen = aporteMensal * ((Math.pow(1 + taxaMensal, nMeses) - 1) / taxaMensal);
    return vfIni + vfMen;
  };

  const patrimonioComTitulo = calcularRetorno(taxaBase);
  const patrimonioSemTitulo = calcularRetorno(taxaMercado);
  const ganhoOportunidade = patrimonioSemTitulo - patrimonioComTitulo;
  const ganhoPercentual = (ganhoOportunidade / patrimonioComTitulo) * 100;

  const trajetoriaComparativa = Array.from({ length: anos + 1 }, (_, i) => {
    const nMeses = i * 12;
    const taxaMensalBase = Math.pow(1 + taxaBase / 100, 1 / 12) - 1;
    const taxaMensalMercado = Math.pow(1 + taxaMercado / 100, 1 / 12) - 1;

    const vfIniBase = aporteInicial * Math.pow(1 + taxaMensalBase, nMeses);
    const vfMenBase = nMeses === 0 ? 0 : aporteMensal * ((Math.pow(1 + taxaMensalBase, nMeses) - 1) / taxaMensalBase);
    const comTitulo = vfIniBase + vfMenBase;

    const vfIniMercado = aporteInicial * Math.pow(1 + taxaMensalMercado, nMeses);
    const vfMenMercado = nMeses === 0 ? 0 : aporteMensal * ((Math.pow(1 + taxaMensalMercado, nMeses) - 1) / taxaMensalMercado);
    const semTitulo = vfIniMercado + vfMenMercado;

    return {
      ano: i,
      comTitulo: Math.round(comTitulo / 1000),
      semTitulo: Math.round(semTitulo / 1000),
      diferenca: Math.round((semTitulo - comTitulo) / 1000),
    };
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bp-card p-6">
          <label className="block text-[#94A3B8] text-sm mb-3 font-medium">Titulo Selecionado</label>
          <select
            value={tituloBase}
            onChange={e => setTituloBase(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] text-white font-medium mb-4"
          >
            {titulosDisponiveis.map((t, i) => (
              <option key={i} value={i}>
                {t.label} - IPCA+{t.taxa}%
              </option>
            ))}
          </select>
          <div className="p-3 rounded-lg" style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.3)" }}>
            <p className="text-[#94A3B8] text-xs mb-1">Taxa do Titulo</p>
            <p className="text-2xl font-bold text-[#00B4D8]">IPCA+{taxaBase}%</p>
          </div>
        </div>

        <div className="bp-card p-6">
          <label className="block text-[#94A3B8] text-sm mb-3 font-medium">Taxa de Mercado (Cenario)</label>
          <div className="flex items-center gap-3 mb-4">
            <input
              type="range" min={4} max={12} step={0.25} value={taxaMercado}
              onChange={e => setTaxaMercado(Number(e.target.value))}
              className="flex-1 accent-[#EF476F]"
            />
            <span className="text-[#EF476F] font-mono font-bold w-16 text-right">IPCA+{taxaMercado}%</span>
          </div>
          <div className="p-3 rounded-lg" style={{ background: diferencialTaxa > 0 ? "rgba(239,71,111,0.1)" : "rgba(6,214,160,0.1)", border: `1px solid ${diferencialTaxa > 0 ? "rgba(239,71,111,0.3)" : "rgba(6,214,160,0.3)"}` }}>
            <p className="text-[#94A3B8] text-xs mb-1">Diferencial</p>
            <p className="text-2xl font-bold" style={{ color: diferencialTaxa > 0 ? "#EF476F" : "#06D6A0" }}>
              {diferencialTaxa > 0 ? "+" : ""}{diferencialTaxa.toFixed(2)}pp
            </p>
          </div>
        </div>
      </div>

      <div className="bp-card p-6">
        <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Trajetoria de Patrimonio</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trajetoriaComparativa}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
              <XAxis dataKey="ano" stroke="#64748B" tick={{ fontSize: 10 }} tickFormatter={v => `${v}a`} />
              <YAxis stroke="#64748B" tick={{ fontSize: 10 }} tickFormatter={v => `R$${v}k`} />
              <Tooltip content={<CustomTooltip unit="k" />} />
              <Legend />
              <Line type="monotone" dataKey="comTitulo" name="Com Titulo (IPCA+{taxaBase}%)" stroke="#00B4D8" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="semTitulo" name="Taxa de Mercado (IPCA+{taxaMercado}%)" stroke="#EF476F" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bp-card p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Patrimonio com Titulo (20 anos)</p>
          <div className="text-3xl font-bold bp-stat-number text-[#00B4D8]">
            R$ {(patrimonioComTitulo / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k
          </div>
        </div>

        <div className="bp-card p-6">
          <p className="text-[#94A3B8] text-sm mb-2">Patrimonio com Taxa de Mercado</p>
          <div className="text-3xl font-bold bp-stat-number text-[#EF476F]">
            R$ {(patrimonioSemTitulo / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k
          </div>
        </div>

        <div className="bp-card p-6 border-l-4" style={{ borderColor: diferencialTaxa > 0 ? "#06D6A0" : "#EF476F" }}>
          <p className="text-[#94A3B8] text-sm mb-2">Ganho/Perda de Oportunidade</p>
          <div className="text-3xl font-bold bp-stat-number" style={{ color: diferencialTaxa > 0 ? "#06D6A0" : "#EF476F" }}>
            R$ {Math.abs(ganhoOportunidade / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k
          </div>
          <p className="text-xs mt-2" style={{ color: diferencialTaxa > 0 ? "#06D6A0" : "#EF476F" }}>
            {diferencialTaxa > 0 ? "Ganho potencial" : "Proteção"} ({Math.abs(ganhoPercentual).toFixed(1)}%)
          </p>
        </div>
      </div>

      <div className="bp-card p-6" style={{ background: "rgba(6,214,160,0.05)", border: "1px solid rgba(6,214,160,0.2)" }}>
        <p className="text-[#06D6A0] font-semibold mb-3">Interpretacao da Assimetria</p>
        <p className="text-[#94A3B8] text-sm leading-relaxed">
          {diferencialTaxa > 0 ? (
            <>Quando as taxas de mercado <strong>SOBEM</strong> para IPCA+{taxaMercado}%, você fica <strong>protegido</strong> no titulo IPCA+{taxaBase}% que já foi contratado. Se tivesse esperado, teria ganhado R$ {(ganhoOportunidade / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k a mais — esse é o <strong>ganho de oportunidade</strong> que você deixa de aproveitar, mas também deixa de perder se as taxas caírem.
            </>
          ) : (
            <>Quando as taxas de mercado <strong>CAEM</strong> para IPCA+{taxaMercado}%, você fica <strong>beneficiado</strong> no titulo IPCA+{taxaBase}% que já foi contratado. Você ganhou R$ {Math.abs(ganhoOportunidade / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k em relação a aplicar na taxa menor — esse é o <strong>ganho de convexidade</strong> do titulo de longo prazo.
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function CenariosComparacao() {
  const [selectedCenario, setSelectedCenario] = useState(0);
  const aporteInicial = 50000;
  const aporteMensal = 1000;
  const anos = 20;

  const resultados = cenariosMacro.map(c => calcularCenario(aporteInicial, aporteMensal, anos, c.taxaInicial, c.taxaFinal));
  const patrimonioMax = Math.max(...resultados.map(r => r.patrimonio));
  const rendaMax = Math.max(...resultados.map(r => r.renda));

  const trajetorias = cenariosMacro.map((c, idx) => {
    const dados = [];
    for (let i = 0; i <= anos; i++) {
      const nMeses = i * 12;
      const metadeNMeses = (anos * 12) / 2;
      const taxaMensalInicial = Math.pow(1 + c.taxaInicial / 100, 1 / 12) - 1;
      const taxaMensalFinal = Math.pow(1 + c.taxaFinal / 100, 1 / 12) - 1;
      
      let valor;
      if (nMeses <= metadeNMeses) {
        const vfIni = aporteInicial * Math.pow(1 + taxaMensalInicial, nMeses);
        const vfMen = nMeses === 0 ? 0 : aporteMensal * ((Math.pow(1 + taxaMensalInicial, nMeses) - 1) / taxaMensalInicial);
        valor = vfIni + vfMen;
      } else {
        const vfMeio = aporteInicial * Math.pow(1 + taxaMensalInicial, metadeNMeses) + aporteMensal * ((Math.pow(1 + taxaMensalInicial, metadeNMeses) - 1) / taxaMensalInicial);
        const vfIni = vfMeio * Math.pow(1 + taxaMensalFinal, nMeses - metadeNMeses);
        const vfMen = aporteMensal * ((Math.pow(1 + taxaMensalFinal, nMeses - metadeNMeses) - 1) / taxaMensalFinal);
        valor = vfIni + vfMen;
      }
      dados.push({ ano: i, valor: Math.round(valor / 1000) });
    }
    return dados;
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cenariosMacro.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedCenario(i)}
            className={`p-4 rounded-lg transition-all text-left ${
              selectedCenario === i
                ? "border-2 bp-card"
                : "border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
            }`}
            style={{
              borderColor: selectedCenario === i ? c.cor : undefined,
              background: selectedCenario === i ? `${c.cor}10` : "transparent",
            }}
          >
            <div className="font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.nome}</div>
            <p className="text-[#94A3B8] text-sm mt-1">{c.descricao}</p>
            <p className="text-xs mt-2" style={{ color: c.cor }}>{c.label}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bp-card p-6">
          <h3 className="font-bold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Trajetoria do Patrimonio</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trajetorias[selectedCenario]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
                <XAxis dataKey="ano" stroke="#64748B" tick={{ fontSize: 10 }} tickFormatter={v => `${v}a`} />
                <YAxis stroke="#64748B" tick={{ fontSize: 10 }} tickFormatter={v => `R$${v}k`} />
                <Tooltip content={<CustomTooltip unit="k" />} />
                <Line type="monotone" dataKey="valor" stroke={cenariosMacro[selectedCenario].cor} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bp-card p-6">
            <p className="text-[#94A3B8] text-sm mb-1">Patrimonio Acumulado em 20 anos</p>
            <div className="text-3xl font-bold bp-stat-number" style={{ color: cenariosMacro[selectedCenario].cor }}>
              R$ {(resultados[selectedCenario].patrimonio / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k
            </div>
            <div className="mt-4 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(resultados[selectedCenario].patrimonio / patrimonioMax) * 100}%`,
                  background: cenariosMacro[selectedCenario].cor,
                }}
              />
            </div>
          </div>

          <div className="bp-card p-6">
            <p className="text-[#94A3B8] text-sm mb-1">Renda Mensal Liquida (20 anos)</p>
            <div className="text-3xl font-bold bp-stat-number" style={{ color: cenariosMacro[selectedCenario].cor }}>
              R$ {resultados[selectedCenario].renda.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
            </div>
            <div className="mt-4 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(resultados[selectedCenario].renda / rendaMax) * 100}%`,
                  background: cenariosMacro[selectedCenario].cor,
                }}
              />
            </div>
          </div>

          <div className="bp-card p-4 border-l-4" style={{ borderColor: cenariosMacro[selectedCenario].cor }}>
            <p className="text-xs text-[#94A3B8] mb-2">Parametros da Simulacao</p>
            <div className="space-y-1 text-sm">
              <p>Aporte Inicial: <span className="text-white font-mono">R$ {aporteInicial.toLocaleString('pt-BR')}</span></p>
              <p>Aporte Mensal: <span className="text-white font-mono">R$ {aporteMensal.toLocaleString('pt-BR')}</span></p>
              <p>Periodo: <span className="text-white font-mono">{anos} anos</span></p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cenariosMacro.map((c, i) => (
          <div key={i} className="bp-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ background: c.cor }} />
              <p className="font-semibold text-white text-sm">{c.nome}</p>
            </div>
            <p className="text-[#94A3B8] text-xs mb-3">{c.descricao}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Patrimonio:</span>
                <span className="font-mono" style={{ color: c.cor }}>R$ {(resultados[i].patrimonio / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Renda Mensal:</span>
                <span className="font-mono" style={{ color: c.cor }}>R$ {resultados[i].renda.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SIMULATOR ───────────────────────────────────────────────────────────────

function Simulator() {
  const [tituloSelecionado, setTituloSelecionado] = useState(3);
  const [aporteInicial, setAporteInicial] = useState(0);
  const [aporte, setAporte] = useState(500);
  const [anos, setAnos] = useState(20);
  const [ipacaCustomizado, setIpacaCustomizado] = useState(titulosDisponiveis[3].taxa);
  const taxa = ipacaCustomizado;

  const taxaMensal = Math.pow(1 + taxa / 100, 1 / 12) - 1;
  const nMeses = anos * 12;
  // Valor futuro do aporte inicial corrigido
  const vfInicial = aporteInicial * Math.pow(1 + taxaMensal, nMeses);
  // Valor futuro dos aportes mensais
  const vfMensal = aporte * ((Math.pow(1 + taxaMensal, nMeses) - 1) / taxaMensal);
  const vf = vfInicial + vfMensal;
  const rendaMensal = vf * taxaMensal / (1 - Math.pow(1 + taxaMensal, -240));
  const capitalMensal = vf / 240;
  const rentabilidadeMensal = rendaMensal - capitalMensal;
  const irMensal = rentabilidadeMensal * 0.15;
  const rendaLiquida = rendaMensal - irMensal;
  const totalInvestido = aporteInicial + aporte * nMeses;
  const multiplicador = totalInvestido > 0 ? vf / totalInvestido : 0;

  const simData = Array.from({ length: anos + 1 }, (_, i) => {
    const n = i * 12;
    const vfIni = aporteInicial * Math.pow(1 + taxaMensal, n);
    const vfMen = n === 0 ? 0 : aporte * ((Math.pow(1 + taxaMensal, n) - 1) / taxaMensal);
    const val = vfIni + vfMen;
    return { ano: i, valor: Math.round(val / 1000), investido: Math.round((aporteInicial + aporte * n) / 1000) };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#94A3B8] text-sm mb-2 font-medium">Aporte Inicial (único)</label>
          <div className="flex items-center gap-3">
            <input
              type="range" min={0} max={500000} step={5000} value={aporteInicial}
              onChange={e => setAporteInicial(Number(e.target.value))}
              className="flex-1 accent-[#FFB703]"
            />
            <span className="bp-stat-number text-[#FFB703] text-lg w-36 text-right">
              R$ {aporteInicial.toLocaleString('pt-BR')}
            </span>
          </div>
          <p className="text-[#64748B] text-xs mt-1">Valor aplicado de uma só vez no início</p>
        </div>
        <div>
          <label className="block text-[#94A3B8] text-sm mb-2 font-medium">Aporte Mensal Recorrente</label>
          <div className="flex items-center gap-3">
            <input
              type="range" min={0} max={5000} step={100} value={aporte}
              onChange={e => setAporte(Number(e.target.value))}
              className="flex-1 accent-[#00B4D8]"
            />
            <span className="bp-stat-number text-[#00B4D8] text-lg w-28 text-right">
              R$ {aporte.toLocaleString('pt-BR')}
            </span>
          </div>
          <p className="text-[#64748B] text-xs mt-1">Valor aplicado todo mês durante a acumulação</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#94A3B8] text-sm mb-2 font-medium">Anos de Acumulação</label>
          <div className="flex items-center gap-3">
            <input
              type="range" min={5} max={35} step={1} value={anos}
              onChange={e => setAnos(Number(e.target.value))}
              className="flex-1 accent-[#06D6A0]"
            />
            <span className="bp-stat-number text-[#06D6A0] text-lg w-20 text-right">{anos} anos</span>
          </div>
        </div>
        <div>
          <label className="block text-[#94A3B8] text-sm mb-2 font-medium">IPCA+ Customizado (%)</label>
          <div className="flex items-center gap-3">
            <input
              type="number" min={0.01} max={15} step={0.01} value={ipacaCustomizado}
              onChange={e => setIpacaCustomizado(Number(e.target.value))}
              className="flex-1 px-3 py-2 rounded-lg bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] text-white font-medium text-center"
              placeholder="Ex: 6.83"
            />
            <span className="bp-stat-number text-[#00B4D8] text-lg w-24 text-right">IPCA+{ipacaCustomizado.toFixed(2)}%</span>
          </div>
          <p className="text-[#94A3B8] text-xs mt-2">Ajuste a taxa real do título (até 2 casas decimais)</p>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Renda Mensal Líquida", value: `R$ ${rendaLiquida.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`, color: "#06D6A0" },
          { label: "Patrimônio Acumulado", value: `R$ ${(vf / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k`, color: "#00B4D8" },
          { label: "Total Investido", value: `R$ ${(totalInvestido / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}k`, color: "#94A3B8" },
          { label: "Multiplicador", value: `${multiplicador.toFixed(1)}x`, color: "#FFB703" },
        ].map((item, i) => (
          <div key={i} className="bp-card p-4 text-center">
            <div className="text-xl font-bold bp-stat-number" style={{ color: item.color }}>{item.value}</div>
            <p className="text-[#64748B] text-xs mt-1">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={simData}>
            <defs>
              <linearGradient id="gradValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradInvestido" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
            <XAxis dataKey="ano" stroke="#64748B" tick={{ fontSize: 11 }} tickFormatter={v => `${v}a`} />
            <YAxis stroke="#64748B" tick={{ fontSize: 11 }} tickFormatter={v => `R$${v}k`} />
            <Tooltip content={<CustomTooltip unit="k" />} />
            <Legend />
            <Area type="monotone" dataKey="investido" name="Total Investido" stroke="#94A3B8" fill="url(#gradInvestido)" strokeWidth={1.5} />
            <Area type="monotone" dataKey="valor" name="Patrimônio Acumulado" stroke="#00B4D8" fill="url(#gradValor)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[#64748B] text-xs text-center">
        * Simulação ilustrativa. Valores reais em termos de poder de compra (IPCA+{taxa}% a.a.). IR de 15% aplicado na renda mensal.
        {aporteInicial > 0 ? ` Aporte inicial de R$ ${aporteInicial.toLocaleString('pt-BR')} considerado no cálculo.` : ""}
      </p>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  const [tituloGlobal, setTituloGlobal] = useState(3);
  const [activeTab, setActiveTab] = useState<"taxas" | "assimetria" | "ipca" | "curvas">("taxas");
  const [scrolled, setScrolled] = useState(false);
  const taxaGlobal = titulosDisponiveis[tituloGlobal].taxa;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#o-titulo", label: "O Título" },
    { href: "#assimetria", label: "Assimetria" },
    { href: "#fiscal", label: "Benefício Fiscal" },
    { href: "#simulador", label: "Simulador" },
    { href: "#merton", label: "Estudo Nobel" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1E" }}>

      {/* ── NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0F1E]/95 backdrop-blur-md border-b border-[rgba(0,180,216,0.15)]" : "bg-transparent"}`}>
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388041515/YuV3dqCgqAnj3zkb8F8paS/avere_logo_639ea1c2.jfif" alt="AVERE Partners" className="h-8" />
            <div className="hidden sm:block border-l border-[rgba(0,180,216,0.3)] pl-3">
              <span className="font-bold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Tesouro Renda<span style={{ color: "#00B4D8" }}>+</span>
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <select
              value={tituloGlobal}
              onChange={e => setTituloGlobal(Number(e.target.value))}
              className="px-3 py-1 rounded-lg bg-[rgba(0,180,216,0.1)] border border-[#00B4D8] text-white text-sm font-medium hover:bg-[rgba(0,180,216,0.15)] transition-colors"
            >
              {titulosDisponiveis.map((t, i) => (
                <option key={i} value={i}>
                  {t.label}
                </option>
              ))}
            </select>
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-[#94A3B8] hover:text-[#00B4D8] transition-colors text-sm font-medium">
                {link.label}
              </a>
            ))}
          </div>
          <div className="bp-badge-neutral text-xs">Fev/2026</div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663388041515/YuV3dqCgqAnj3zkb8F8paS/hero_bg-NjEtzkyFWEB6cH2GiKksSe.webp)` }}
        />
        <div className="absolute inset-0 bp-grid-bg" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(0,180,216,0.08) 0%, transparent 60%)" }} />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="bp-badge-neutral">Análise de Investimentos</span>
              <span className="bp-badge-positive">IPCA + {taxaGlobal}% a.a.</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Tesouro{" "}
              <span style={{ background: "linear-gradient(135deg, #00B4D8, #06D6A0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Renda+
              </span>
            </h1>

            <p className="text-[#94A3B8] text-xl mb-4 leading-relaxed">
              O único título público brasileiro que combina <strong className="text-white">proteção total contra a inflação</strong>, 
              renda mensal garantida por 20 anos e o mais poderoso benefício fiscal do mercado de renda fixa.
            </p>

            <p className="text-[#64748B] text-sm mb-10 italic">
              Inspirado no conceito SeLFIES de <strong className="text-[#94A3B8]">Robert C. Merton</strong> (Nobel de Economia) e <strong className="text-[#94A3B8]">Arun Muralidhar</strong> — MIT Sloan School of Management
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#simulador" className="px-6 py-3 rounded-lg font-semibold text-[#0A0F1E] transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00B4D8, #06D6A0)" }}>
                Simular Minha Renda
              </a>
              <a href="#assimetria" className="px-6 py-3 rounded-lg font-semibold text-[#00B4D8] border border-[rgba(0,180,216,0.4)] hover:bg-[rgba(0,180,216,0.1)] transition-all">
                Ver Análise Completa
              </a>
            </div>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          {[
            { label: "Taxa Atual", value: "IPCA+7,05%", color: "#00B4D8" },
            { label: "Máximo Histórico", value: "IPCA+7,53%", color: "#FFB703" },
            { label: "Prazo de Renda", value: "240 meses", color: "#06D6A0" },
            { label: "Invest. Mínimo", value: "R$ 30,00", color: "#94A3B8" },
          ].map((stat, i) => (
            <div key={i} className="bp-card p-4 w-52">
              <p className="text-[#64748B] text-xs mb-1">{stat.label}</p>
              <p className="font-bold bp-stat-number" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="border-y border-[rgba(0,180,216,0.15)] py-8" style={{ background: "rgba(15,22,41,0.8)" }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard value={7} label="Taxa Real Atual (IPCA+%)" suffix="%" color="cyan" />
            <StatCard value={20} label="Anos de Renda Mensal" suffix=" anos" color="emerald" />
            <StatCard value={15} label="IR Mínimo (após 2 anos)" suffix="%" color="gold" />
            <StatCard value={240} label="Parcelas Mensais de Renda" suffix="" color="cyan" delay={200} />
          </div>
        </div>
      </section>

      {/* ── O TÍTULO ── */}
      <section id="o-titulo" className="py-20 bp-grid-bg">
        <div className="container">
          <SectionHeader
            tag="O QUE É"
            title="Tesouro Renda+: A Revolução da Aposentadoria"
            subtitle="O primeiro título público do mundo baseado no conceito SeLFIES, criado por ganhadores do Nobel de Economia."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-[#94A3B8] leading-relaxed">
                O Tesouro RendA+ (NTN-B1) foi criado pelo Decreto 11.301/2022 e está disponível desde janeiro de 2023. 
                É o único título do Tesouro Direto especificamente desenhado para a aposentadoria, funcionando em duas fases distintas.
              </p>

              <div className="space-y-4">
                {[
                  {
                    fase: "Fase 1", titulo: "Período de Acumulação",
                    desc: "O investidor realiza aportes mensais ou pontuais, acumulando cotas corrigidas pelo IPCA + taxa real contratada. Não há pagamento de IR nesta fase.",
                    color: "#00B4D8", icon: "📈"
                  },
                  {
                    fase: "Fase 2", titulo: "Período de Conversão (20 anos)",
                    desc: "A partir da data de conversão escolhida, o título paga 240 parcelas mensais corrigidas pelo IPCA. O IR é cobrado apenas neste momento.",
                    color: "#06D6A0", icon: "💰"
                  },
                ].map((item, i) => (
                  <div key={i} className="bp-card p-5 flex gap-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono" style={{ color: item.color }}>{item.fase}</span>
                        <span className="font-semibold text-white">{item.titulo}</span>
                      </div>
                      <p className="text-[#94A3B8] text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bp-card p-5 border-l-4 border-[#FFB703]">
                <p className="text-[#FFB703] font-semibold text-sm mb-1">Datas Disponíveis</p>
                <p className="text-[#94A3B8] text-sm">
                  2030, 2035, 2040, 2045, 2050, 2055, 2060 e 2065. O investidor escolhe a data que coincide com sua aposentadoria planejada.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388041515/YuV3dqCgqAnj3zkb8F8paS/retirement_income-QzC2Vps5zzWtYWMRNhUF9X.webp"
                alt="Renda para aposentadoria"
                className="rounded-xl w-full object-cover"
                style={{ height: "400px", opacity: 0.85 }}
              />
              <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(to top, #0A0F1E 0%, transparent 50%)" }} />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Risco de Crédito", value: "Soberano", color: "#06D6A0" },
                    { label: "Invest. Mínimo", value: "R$ 30", color: "#00B4D8" },
                    { label: "Custódia", value: "Zero*", color: "#FFB703" },
                  ].map((s, i) => (
                    <div key={i} className="bp-card p-3 text-center">
                      <p className="font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
                      <p className="text-[#64748B] text-xs">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ASSIMETRIA ── */}
      <section id="assimetria" className="py-20" style={{ background: "rgba(10,15,30,0.95)" }}>
        <div className="container">
          <SectionHeader
            tag="ANÁLISE DE RISCO"
            title="A Assimetria Positiva dos Títulos Longos"
            subtitle="Com taxas próximas de máximas históricas, o potencial de ganho supera significativamente o potencial de perda."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                titulo: "Por que existe assimetria?",
                texto: "Quando as taxas reais estão em máximas históricas (IPCA+7,53% em Jan/25), o espaço para alta adicional é limitado. Já o espaço para queda é amplo — taxas podem retornar a IPCA+4% ou IPCA+3% com melhora fiscal.",
                color: "#00B4D8", icon: "⚖️"
              },
              {
                titulo: "Duration amplifica os ganhos",
                texto: "Com duration de ~20 anos, cada 1pp de queda na taxa gera ~20% de valorização no preço do título. Uma queda de 3pp (de 7% para 4%) pode gerar +135% de retorno em 3 anos.",
                color: "#06D6A0", icon: "📐"
              },
              {
                titulo: "Proteção no pior cenário",
                texto: "Mesmo que as taxas subam mais 2pp (para IPCA+9%), a perda seria de ~25%. Mas quem mantiver até o vencimento recebe exatamente a taxa contratada — sem perda alguma.",
                color: "#FFB703", icon: "🛡️"
              },
            ].map((card, i) => (
              <div key={i} className="bp-card p-6">
                <div className="text-2xl mb-3">{card.icon}</div>
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.titulo}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{card.texto}</p>
              </div>
            ))}
          </div>

          {/* Tabs de gráficos */}
          <div className="bp-card p-6">
            <div className="flex gap-2 mb-6 flex-wrap">
              {[
                { key: "taxas", label: "Histórico de Taxas" },
                { key: "assimetria", label: "Cenários de Retorno (Barras)" },
                { key: "curvas", label: "Cenários de Retorno (Curvas)" },
                { key: "ipca", label: "Histórico IPCA" },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? "bg-[#00B4D8] text-[#0A0F1E]"
                      : "text-[#94A3B8] hover:text-white border border-[rgba(0,180,216,0.2)]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="h-80">
              {activeTab === "taxas" && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={taxasHistoricas}>
                    <defs>
                      <linearGradient id="gradTaxa" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
                    <XAxis dataKey="mes" stroke="#64748B" tick={{ fontSize: 10 }} interval={2} />
                    <YAxis stroke="#64748B" tick={{ fontSize: 11 }} domain={[5.4, 7.8]} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={6.50} stroke="#FFB703" strokeDasharray="5 5" label={{ value: "Média: 6,50%", fill: "#FFB703", fontSize: 11 }} />
                    <Area type="monotone" dataKey="taxa" name="Taxa IPCA+" stroke="#00B4D8" fill="url(#gradTaxa)" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: "#00B4D8" }} />
                  </AreaChart>
                </ResponsiveContainer>
              )}

              {activeTab === "assimetria" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assimetriaData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
                    <XAxis dataKey="cenario" stroke="#64748B" tick={{ fontSize: 9 }} />
                    <YAxis stroke="#64748B" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={0} stroke="#64748B" />
                    <Bar dataKey="retorno" name="Retorno em 3 anos" radius={[4, 4, 0, 0]}>
                      {assimetriaData.map((entry, index) => (
                        <Cell key={index} fill={entry.retorno >= 0 ? "#06D6A0" : "#EF476F"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}

              {activeTab === "curvas" && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cenariosCurvas} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
                    <XAxis dataKey="ano" stroke="#64748B" tick={{ fontSize: 10 }} tickFormatter={v => `${v}a`} />
                    <YAxis stroke="#64748B" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="ipca7" name="IPCA+7% (Base)" stroke="#00B4D8" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="ipca9" name="IPCA+9% (Alta)" stroke="#8B3A3A" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="ipca8" name="IPCA+8%" stroke="#A85555" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="ipca6" name="IPCA+6% (Queda)" stroke="#4CAF50" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="ipca5" name="IPCA+5%" stroke="#66BB6A" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                    <Line type="monotone" dataKey="ipca4" name="IPCA+4%" stroke="#81C784" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}

              {activeTab === "ipca" && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ipcaData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
                    <XAxis dataKey="ano" stroke="#64748B" tick={{ fontSize: 9 }} interval={3} />
                    <YAxis stroke="#64748B" tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={6.4} stroke="#EF476F" strokeDasharray="5 5" label={{ value: "Média: 6,4%", fill: "#EF476F", fontSize: 10 }} />
                    <Bar dataKey="sup" name="Teto da Meta" fill="rgba(255,183,3,0.1)" />
                    <Bar dataKey="ipca" name="IPCA Anual" radius={[2, 2, 0, 0]}>
                      {ipcaData.map((entry, index) => (
                        <Cell key={index} fill={entry.ipca > entry.sup || entry.ipca < entry.inf ? "#EF476F" : "#06D6A0"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {activeTab === "ipca" && (
              <div className="mt-4 p-4 rounded-lg" style={{ background: "rgba(239,71,111,0.1)", border: "1px solid rgba(239,71,111,0.2)" }}>
                <p className="text-[#EF476F] text-sm font-semibold mb-1">Assimetria da Inflação Brasileira</p>
                <p className="text-[#94A3B8] text-sm">
                  Em <strong className="text-white">17 dos 26 anos</strong> (2000–2025), o IPCA ficou acima da meta central. 
                  A média histórica de <strong className="text-[#EF476F]">6,4% a.a.</strong> supera consistentemente as metas estabelecidas. 
                  Títulos IPCA+ garantem retorno real independente deste comportamento assimétrico da inflação.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CENÁRIOS MACROECONÔMICOS ── */}
      <section className="py-20" style={{ background: "rgba(10,15,30,0.95)" }}>
        <div className="container">
          <SectionHeader
            tag="ANÁLISE DE CENÁRIOS"
            title="Assimetria em Diferentes Contextos Fiscais"
            subtitle="Veja como o Tesouro Renda+ se comporta em cenários de melhora, estabilidade ou piora das contas públicas."
          />
          <CenariosComparacao />
        </div>
      </section>

      {/* ── COMPARADOR DE ASSIMETRIA DE GANHO ── */}
      <section className="py-20 bp-grid-bg">
        <div className="container">
          <SectionHeader
            tag="ASSIMETRIA DE GANHO"
            title="Ganho de Convexidade vs. Risco de Oportunidade"
            subtitle="Selecione um titulo e simule como seu patrimonio se comporta quando as taxas de mercado mudam."
          />
          <ComparadorAssimetriaGanho />
        </div>
      </section>

      {/* ── BENEFÍCIO FISCAL ── */}
      <section id="fiscal" className="py-20 bp-grid-bg">
        <div className="container">
          <SectionHeader
            tag="VANTAGEM FISCAL"
            title="O Poder do Diferimento de IR"
            subtitle="Pagar imposto apenas no resgate cria um efeito de juros compostos sobre o capital que seria tributado."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bp-card p-6">
                <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Como funciona o IR no Tesouro Renda+
                </h3>
                <div className="space-y-3">
                  {[
                    { prazo: "Até 180 dias", aliquota: "22,5%", color: "#EF476F" },
                    { prazo: "181 a 360 dias", aliquota: "20,0%", color: "#FFB703" },
                    { prazo: "361 a 720 dias", aliquota: "17,5%", color: "#00B4D8" },
                    { prazo: "Acima de 720 dias", aliquota: "15,0%", color: "#06D6A0" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <span className="text-[#94A3B8] text-sm">{row.prazo}</span>
                      <span className="font-bold bp-stat-number" style={{ color: row.color }}>{row.aliquota}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-lg" style={{ background: "rgba(6,214,160,0.1)", border: "1px solid rgba(6,214,160,0.2)" }}>
                  <p className="text-[#06D6A0] text-sm font-semibold">
                    ✓ IR cobrado APENAS no momento do resgate ou no recebimento das parcelas mensais
                  </p>
                </div>
              </div>

              <div className="bp-card p-6">
                <h3 className="font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Taxa de Custódia Regressiva (exclusiva)
                </h3>
                <div className="space-y-3">
                  {[
                    { prazo: "Entre 10 e 20 anos até o vencimento", taxa: "0,20% a.a.", color: "#00B4D8" },
                    { prazo: "Acima de 20 anos até o vencimento", taxa: "0,10% a.a.", color: "#06D6A0" },
                    { prazo: "Dentro do limite de 6 salários mínimos/mês", taxa: "ZERO", color: "#FFB703" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <span className="text-[#94A3B8] text-sm flex-1 mr-4">{row.prazo}</span>
                      <span className="font-bold bp-stat-number text-sm" style={{ color: row.color }}>{row.taxa}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#64748B] text-xs mt-3">
                  * Outros títulos do Tesouro cobram 0,20% a.a. semestralmente, independente do prazo.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bp-card p-6">
                <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Diferimento vs. Come-Cotas: Impacto em 20 anos
                </h3>
                <p className="text-[#64748B] text-xs mb-4">Investimento inicial: R$ 100.000 | IPCA + 7% a.a. | IR: 15%</p>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { ano: 0, comDiferimento: 100, semDiferimento: 100 },
                      { ano: 2, comDiferimento: 114, semDiferimento: 112 },
                      { ano: 4, comDiferimento: 131, semDiferimento: 126 },
                      { ano: 6, comDiferimento: 150, semDiferimento: 141 },
                      { ano: 8, comDiferimento: 172, semDiferimento: 159 },
                      { ano: 10, comDiferimento: 197, semDiferimento: 178 },
                      { ano: 12, comDiferimento: 225, semDiferimento: 200 },
                      { ano: 14, comDiferimento: 258, semDiferimento: 225 },
                      { ano: 16, comDiferimento: 296, semDiferimento: 253 },
                      { ano: 18, comDiferimento: 339, semDiferimento: 284 },
                      { ano: 20, comDiferimento: 349, semDiferimento: 319 },
                    ]}>
                      <defs>
                        <linearGradient id="gradDif" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00B4D8" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="gradSem" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#94A3B8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,180,216,0.08)" />
                      <XAxis dataKey="ano" stroke="#64748B" tick={{ fontSize: 10 }} tickFormatter={v => `${v}a`} />
                      <YAxis stroke="#64748B" tick={{ fontSize: 10 }} tickFormatter={v => `R$${v}k`} />
                      <Tooltip content={<CustomTooltip unit="k" />} />
                      <Legend />
                      <Area type="monotone" dataKey="semDiferimento" name="Come-cotas (IR anual)" stroke="#94A3B8" fill="url(#gradSem)" strokeWidth={1.5} strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="comDiferimento" name="Tesouro Renda+ (IR no resgate)" stroke="#00B4D8" fill="url(#gradDif)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-3 rounded-lg flex items-center justify-between" style={{ background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.2)" }}>
                  <span className="text-[#94A3B8] text-sm">Vantagem do diferimento em 20 anos:</span>
                  <span className="text-[#00B4D8] font-bold bp-stat-number">+R$ 30.000</span>
                </div>
              </div>

              <div className="bp-card p-5 border-l-4 border-[#06D6A0]">
                <p className="text-[#06D6A0] font-semibold text-sm mb-2">O Efeito Multiplicador do Diferimento</p>
                <p className="text-[#94A3B8] text-sm leading-relaxed">
                  Ao não pagar IR periodicamente, o investidor mantém o capital íntegro trabalhando em juros compostos. 
                  O valor que seria pago ao fisco continua gerando rendimentos, criando um efeito de "empréstimo gratuito" do governo ao investidor por décadas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SIMULADOR ── */}
      <section id="simulador" className="py-20" style={{ background: "rgba(10,15,30,0.95)" }}>
        <div className="container">
          <SectionHeader
            tag="SIMULADOR INTERATIVO"
            title="Calcule Sua Renda de Aposentadoria"
            subtitle="Ajuste os parâmetros e veja em tempo real quanto você pode receber mensalmente."
          />
          <div className="bp-card p-8">
            <Simulator />
          </div>
        </div>
      </section>

      {/* ── ESTUDO MERTON ── */}
      <section id="merton" className="py-20 bp-grid-bg">
        <div className="container">
          <SectionHeader
            tag="BASE ACADÊMICA"
            title="O Estudo que Inspirou o Tesouro Renda+"
            subtitle="O Brasil foi o primeiro país do mundo a implementar o conceito SeLFIES, desenvolvido por ganhadores do Nobel."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388041515/YuV3dqCgqAnj3zkb8F8paS/merton_study-3Ru4gPH6gVio9FHeJyb2Hx.webp"
                alt="Estudo acadêmico SeLFIES"
                className="rounded-xl w-full object-cover"
                style={{ height: "380px", opacity: 0.85 }}
              />
              <div className="absolute inset-0 rounded-xl" style={{ background: "linear-gradient(to right, #0A0F1E 0%, transparent 40%)" }} />
              <div className="absolute top-6 left-6">
                <div className="bp-card p-4">
                  <p className="text-[#FFB703] font-bold text-sm">Nobel de Economia</p>
                  <p className="text-[#94A3B8] text-xs">Robert C. Merton, 1997</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bp-card p-6">
                <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  O que são SeLFIES?
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-4">
                  <strong className="text-white">SeLFIES</strong> (Standard-of-Living Indexed, Forward-starting, Income-only Securities) 
                  foram propostos por Merton e Muralidhar no artigo <em>"SeLFIES: A New Pension Bond and Currency for Retirement"</em>, 
                  publicado no Journal of Financial Transformation (2020).
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { letra: "S", desc: "Standard-of-Living Indexed — indexado ao padrão de vida (inflação)", color: "#00B4D8" },
                    { letra: "eL", desc: "Forward-starting — pagamentos iniciam na aposentadoria", color: "#06D6A0" },
                    { letra: "F", desc: "Income-only — fluxo de renda contínuo, sem resgate único", color: "#FFB703" },
                    { letra: "IES", desc: "Securities — título negociável emitido pelo governo", color: "#94A3B8" },
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <span className="font-bold text-lg bp-stat-number" style={{ color: item.color }}>{item.letra}</span>
                      <p className="text-[#64748B] text-xs mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bp-card p-6">
                <h3 className="font-semibold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Principais Conclusões do Estudo
                </h3>
                <div className="space-y-3">
                  {[
                    "Os sistemas previdenciários tradicionais falham ao não garantir fluxo de renda vitalício indexado ao custo de vida.",
                    "Títulos IPCA+ de longo prazo são o 'ativo seguro relativo' ideal para planos de aposentadoria.",
                    "A dependência de instrumentos que não protegem contra inflação expõe os aposentados a risco sistêmico.",
                    "O Brasil foi o primeiro país a implementar este conceito, tornando-se referência global em inovação previdenciária.",
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="text-[#06D6A0] mt-0.5 flex-shrink-0">✓</span>
                      <p className="text-[#94A3B8]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bp-card p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,183,3,0.2)" }}>
                  <span className="text-lg">🎓</span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">MIT Sloan School of Management</p>
                  <p className="text-[#64748B] text-xs">Parceria com o Tesouro Nacional Brasileiro para desenvolvimento do Renda+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARATIVO ── */}
      <section className="py-20" style={{ background: "rgba(10,15,30,0.95)" }}>
        <div className="container">
          <SectionHeader
            tag="COMPARATIVO"
            title="Tesouro Renda+ vs. Alternativas"
            subtitle="Entenda como o Renda+ se posiciona frente às principais opções de previdência complementar."
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[rgba(0,180,216,0.15)]">
                  <th className="text-left py-4 px-4 text-[#94A3B8] font-medium">Característica</th>
                  {["Tesouro Renda+", "Previdência PGBL", "Previdência VGBL", "Tesouro IPCA+"].map(h => (
                    <th key={h} className={`text-center py-4 px-4 font-semibold ${h === "Tesouro Renda+" ? "text-[#00B4D8]" : "text-[#94A3B8]"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { item: "Proteção contra inflação", vals: ["✓ IPCA+", "Depende", "Depende", "✓ IPCA+"] },
                  { item: "IR no resgate apenas", vals: ["✓ Sim", "✓ Sim", "✓ Sim", "✓ Sim"] },
                  { item: "Come-cotas semestral", vals: ["✗ Não", "✗ Não", "✗ Não", "✗ Não"] },
                  { item: "Risco de crédito", vals: ["Soberano", "Seguradora", "Seguradora", "Soberano"] },
                  { item: "Taxa de administração", vals: ["0% a 0,20%", "0,5% a 3%", "0,5% a 3%", "0,20% a.a."] },
                  { item: "Renda mensal garantida", vals: ["✓ 20 anos", "✗ Não", "✗ Não", "✗ Não"] },
                  { item: "IR mínimo", vals: ["15%", "10% (tabela)", "10% (tabela)", "15%"] },
                  { item: "Inventário em caso de morte", vals: ["Necessário", "✓ Isento", "✓ Isento", "Necessário"] },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(0,180,216,0.03)] transition-colors">
                    <td className="py-3 px-4 text-[#94A3B8]">{row.item}</td>
                    {row.vals.map((val, j) => (
                      <td key={j} className={`py-3 px-4 text-center ${j === 0 ? "text-white font-medium" : "text-[#64748B]"}`}>
                        {val === "✓ Sim" || val === "✓ IPCA+" || val === "✓ 20 anos" || val === "✓ Isento" ? (
                          <span style={{ color: "#06D6A0" }}>{val}</span>
                        ) : val === "✗ Não" || val === "Necessário" ? (
                          <span style={{ color: "#EF476F" }}>{val}</span>
                        ) : val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── RISCOS ── */}
      <section className="py-20 bp-grid-bg">
        <div className="container">
          <SectionHeader
            tag="GESTÃO DE RISCOS"
            title="Riscos que o Investidor Deve Conhecer"
            subtitle="Transparência é fundamental. Conheça os principais riscos antes de investir."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                titulo: "Risco de Mercado",
                desc: "Alta volatilidade no curto prazo devido à duration longa (~20 anos). Drawdown máximo observado de -65% em 2024.",
                nivel: "ALTO", color: "#EF476F", icon: "📉"
              },
              {
                titulo: "Risco de Crédito",
                desc: "Mínimo. O emissor é o Tesouro Nacional Brasileiro — o menor risco de crédito disponível no país.",
                nivel: "MÍNIMO", color: "#06D6A0", icon: "🏛️"
              },
              {
                titulo: "Risco Comportamental",
                desc: "O maior risco: vender no momento errado, em períodos de stress. Requer disciplina e horizonte de longo prazo.",
                nivel: "ALTO", color: "#FFB703", icon: "🧠"
              },
              {
                titulo: "Risco de Longevidade",
                desc: "O título paga por exatamente 20 anos. Se o investidor viver mais, não haverá renda adicional deste título.",
                nivel: "MÉDIO", color: "#00B4D8", icon: "⏳"
              },
            ].map((card, i) => (
              <div key={i} className="bp-card p-6">
                <div className="text-2xl mb-3">{card.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{card.titulo}</h3>
                </div>
                <p className="text-[#64748B] text-xs leading-relaxed mb-3">{card.desc}</p>
                <span className="text-xs font-bold bp-stat-number" style={{ color: card.color }}>
                  Nível: {card.nivel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISCLAIMERS ── */}
      <section className="py-16 bp-grid-bg">
        <div className="container">
          <SectionHeader
            tag="AVISOS IMPORTANTES"
            title="Leia Antes de Investir"
            subtitle="Informações essenciais sobre o Tesouro Renda+ e as simulações apresentadas."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                titulo: "Valor de Mercado",
                desc: "O valor apresentado é referente ao preço do título na data de hoje. Lembre-se: esse valor pode sofrer alterações conforme as taxas de juros do mercado mudam.",
                icon: "💰"
              },
              {
                titulo: "Projeção Bruta",
                desc: "Projeção do valor bruto de recebimento (antes das taxas e impostos). O valor final líquido será reduzido pelo IR retido na fonte (15% a 22.5%, dependendo do tempo de aplicação).",
                icon: "📋"
              },
              {
                titulo: "Simulações Ilustrativas",
                desc: "As simulações são baseadas em projeções de mercado. Isso não garante resultados futuros. Mercados financeiros são imprevisíveis e sujeitos a riscos.",
                icon: "⚠️"
              },
              {
                titulo: "Renda Corrigida pela Inflação",
                desc: "A renda mensal que você receberá será corrigida mensalmente pela variação do IPCA, garantindo o poder de compra. Quanto maior a inflação, maior será sua renda.",
                icon: "💪"
              },
            ].map((item, i) => (
              <div key={i} className="bp-card p-6 border-l-4" style={{ borderColor: "#00B4D8" }}>
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{item.titulo}</h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-6 rounded-lg" style={{ background: "rgba(239,71,111,0.08)", border: "1px solid rgba(239,71,111,0.3)" }}>
            <p className="text-[#EF476F] font-semibold mb-2">Aviso Legal</p>
            <p className="text-[#94A3B8] text-sm leading-relaxed">
              Este material é apenas ilustrativo e não constitui recomendação de investimento individualizada. Consulte sempre um assessor de investimentos antes de tomar decisões. 
              Investimentos em renda fixa estão sujeitos a riscos de mercado, incluindo variações de taxa de juros e inflação. O desempenho passado não garante resultados futuros.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-[rgba(0,180,216,0.15)]" style={{ background: "#060B16" }}>
        <div className="container">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-3">
                <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663388041515/YuV3dqCgqAnj3zkb8F8paS/avere_logo_639ea1c2.jfif" alt="AVERE Partners" className="h-8" />
                <div>
                  <span className="font-bold text-white text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Tesouro Renda<span style={{ color: "#00B4D8" }}>+</span>
                  </span>
                  <p className="text-[#64748B] text-xs">por AVERE Partners</p>
                </div>
              </div>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Material de consultoria de investimentos. As simulações são ilustrativas e não constituem garantia de retorno. 
                Investimentos em renda fixa estão sujeitos a riscos de mercado.
              </p>
            </div>
            <div className="space-y-2 text-sm text-[#64748B]">
              <p><strong className="text-[#94A3B8]">Fontes:</strong></p>
              <p>• Tesouro Nacional — tesourodireto.gov.br</p>
              <p>• Merton & Muralidhar (2020) — Journal of Financial Transformation</p>
              <p>• XP Investimentos, BTG Pactual, B3</p>
              <p>• IBGE — Séries históricas do IPCA</p>
              <p className="mt-3 text-[#64748B]">Atualizado: Fevereiro 2026</p>
            </div>
          </div>
          <div className="bp-section-divider mt-8 mb-6" />
          <p className="text-center text-[#64748B] text-xs">
            © 2026 — Análise elaborada com base em dados públicos do Tesouro Nacional e estudos acadêmicos. 
            Não constitui recomendação de investimento individualizada.
          </p>
        </div>
      </footer>
    </div>
  );
}
