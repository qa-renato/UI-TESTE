import { Search, Filter, Plus, Eye, MoreVertical, ChevronLeft, ChevronRight, ChevronRight as ChevronIcon, Key, Download, Trash, Edit2, Upload, X, Copy, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Tables.css';

// Truncatable ID Component
const TruncatableId = ({ value }) => {
  const [copied, setCopied] = useState(false);
  
  if (!value || value === '-') return <span className="cell-secondary">-</span>;
  if (value.length <= 12) return <span className="cell-primary">{value}</span>;

  const truncated = `${value.substring(0, 8)}...${value.substring(value.length - 4)}`;

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="truncatable-wrapper" title={value}>
      <span className="cell-primary font-mono">{truncated}</span>
      <button className="btn-copy-id" onClick={handleCopy}>
        {copied ? <Check size={12} color="#1D9E75" /> : <Copy size={12} />}
      </button>
    </div>
  );
};

export default function Tables() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [openRowPopover, setOpenRowPopover] = useState(null);
  const [openColPopover, setOpenColPopover] = useState(null);
  const [openActionsModal, setOpenActionsModal] = useState(false);
  const [showAIFilter, setShowAIFilter] = useState(false);
  const [aiFilterText, setAiFilterText] = useState('');
  const [aiStep, setAiStep] = useState('loading_welcome');
  const [perPage, setPerPage] = useState(15);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showAIFilter) {
        handleCloseAIFilter();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showAIFilter]);

  useEffect(() => {
    if (showAIFilter && aiStep === 'loading_welcome') {
      const timer = setTimeout(() => {
        setAiStep('waiting');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAIFilter, aiStep]);

  const handleProcessAIFilter = () => {
    if (!aiFilterText.trim()) return;
    setAiStep('processing');
    setTimeout(() => setAiStep('success'), 1500);
  };

  const handleKeyDownAI = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && aiStep === 'waiting') {
      e.preventDefault();
      handleProcessAIFilter();
    }
  };

  const handleCloseAIFilter = () => {
    setShowAIFilter(false);
    setAiFilterText('');
    setAiStep('loading_welcome');
  };

  useEffect(() => {
    const handleClick = () => { 
      setOpenRowPopover(null); 
      setOpenColPopover(null);
      setOpenActionsModal(false);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  const tablesData = [
    { id: 1, name: 'jornada_check_in', empresa: 'azul', departamento: 'dashboard', botId: 'azul_bot_prod', linhas: 113075, maxLinhas: 173839, criadaEm: '12/03/2026', alteradaEm: '24/04/2026' },
    { id: 2, name: 'marcacao_de_assento', empresa: 'azul', departamento: 'dashboard', botId: 'azul_bot_prod', linhas: 173839, maxLinhas: 173839, criadaEm: '10/01/2026', alteradaEm: '22/04/2026' },
    { id: 3, name: 'atendimento_humano', empresa: 'azul', departamento: 'dashboard', botId: 'azul_bot_prod', linhas: 80522, maxLinhas: 173839, criadaEm: '05/02/2026', alteradaEm: '23/04/2026' },
    { id: 4, name: 'antecipacao_de_voo', empresa: 'azul', departamento: 'dashboard', botId: 'azul_bot_prod', linhas: 14381, maxLinhas: 173839, criadaEm: '15/03/2026', alteradaEm: '20/04/2026' },
    { id: 5, name: 'unique_login', empresa: 'azul', departamento: 'bots', botId: 'azul_auth_dev', linhas: 640, maxLinhas: 173839, criadaEm: '01/04/2026', alteradaEm: '24/04/2026' },
  ];

  const detailColumns = [
    { id: 'user_id', name: 'User ID' },
    { id: 'channel', name: 'Channel' },
    { id: 'protocol_number', name: 'Protocol Number' },
    { id: 'session_id', name: 'Session ID' },
    { id: 'created_at', name: 'Created At' },
    { id: 'bot_id', name: 'Bot ID' },
    { id: 'inicio_de_jornada', name: 'Inicio - Jornada Check-In' },
    { id: 'inicio_jornada_check_in', name: 'Inicio - Jornada Check-In' },
    { id: 'confirma_reserva_jornada_check_in', name: 'Confirma Reserva - Jornada Check-In' },
    { id: 'seleciona_pass_check', name: 'seleciona_pass_check' },
    { id: 'termos_de_compromisso_1', name: 'termos de compromisso 1' },
    { id: 'termos_de_compromisso_2', name: 'termos de compromisso 2' },
    { id: 'termos_de_compromisso_3', name: 'termos de compromisso 3' },
    { id: 'final_de_jornada', name: 'fim_check' },
    { id: 'cpf', name: 'CPF' },
    { id: 'trecho_check_in', name: 'trecho_check_in' },
    { id: 'av_trecho_check', name: 'av_trecho_check' },
    { id: 'mais_um_check_in', name: 'Mais um check-in' },
    { id: 'checin_realizado', name: 'Confirmar check -in' },
    { id: 'nome_user', name: 'Nome' },
    { id: 'telefone_user', name: 'Telefone' },
    { id: 'cpf_usuario', name: 'CPF' },
    { id: 'codigo_reserva', name: 'Código da Reserva' },
    { id: 'origem_voo', name: 'Origem do Voo' },
    { id: 'voo_nacional', name: 'Voo é nacional' },
    { id: 'com_pendencia', name: 'Pendência financeira' },
    { id: 'total_jornadas', name: 'Voos com check-in disponível' },
    { id: 'motivo_checkin_api', name: 'Motivo checkin não disponível' },
    { id: 'checkin_ja_feito', name: 'Check-in já realizado' },
    { id: 'total_passageiros_db', name: 'Total de passageiros com check-in disponível' },
    { id: 'jornada_selecionada_bd', name: 'Voo selecionado' },
    { id: 'passageiro_selecionado_db', name: 'Passageiro' },
    { id: 'checkin_disponivel', name: 'Check-in disponível para o passageiro' },
    { id: 'reserva_standby', name: 'Reserva standby' },
    { id: 'assento_ja_marcado', name: 'Assento já estava marcado' },
    { id: 'aceite_termos', name: 'Aceitou os termos de compromisso' },
    { id: 'termo_1', name: 'Termo 1' },
    { id: 'termo_2', name: 'Termo 2' },
    { id: 'termo_3', name: 'Termo 3' },
    { id: 'emitiu_cartao_embarque', name: 'Saiu para emitir cartão de embarque' },
    { id: 'erro_api_motivo', name: 'Motivo erro de api' },
    { id: 'num_total_segmentos', name: 'Número de conexões' },
    { id: 'num_total_passageiros', name: 'Número de passageiros' },
    { id: 'passageiro_selecionado_assign_db', name: 'Passageiro pode marcar assento' },
    { id: 'passageiro_selecionado_pet_db', name: 'Passageiro possui pet' },
    { id: 'ha_pendencia', name: 'Há pendencia financeira' },
    { id: 'pode_pagar', name: 'Pode pagar a pendencia por este canal' }
  ];

  const rawMockData = `dfb49baa-5be9-4dce-9904-51b70278ba8f
web_mobile
20260213153813-996-cal
af08fdc7-ea5b-41b0-a1fc-5939ae3ee28c-v1
2026-02-13 15:38:13
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
Samuel Ribeiro
Não informado
230.842.003-00
MICR6P
for
Sim
Sim
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
b13c3f86-1864-4e98-84b6-4779be80bfa5
web
20260213153814-996-qei
4ca86673-7f3b-443d-9881-b3ba850d7d3b-v1
2026-02-13 15:38:14
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
MATHEUS
Não informado
324.874.968-78
YIPLNF
cwb
Sim
Não
1
N/A
Não
3
| CWB → FOR 1
| MATHEUS CORREA
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
648d8428-9c58-47e2-bcbf-63c46f03589e
web_mobile
20260213153831-996-oco
ed59f9b8-e696-4f20-8e6f-5094b50cd0a8-v1
2026-02-13 15:38:31
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
e59b5402-db10-4537-bbd5-f0dc68b44f24
web_mobile
20260213153917-996-swg
fca1ff41-f1a9-4987-80ca-98872ba88d6e-v1
2026-02-13 15:39:17
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
9f647b21-ab82-4107-99db-7376c9a3a0e5
web
20260213154034-996-xot
af958824-43f3-48c4-98a5-350ae5c37881-v1
2026-02-13 15:40:34
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
EDIMO P A SOUZA
Não informado
065.962.846-54
XE5DUE
bsb
Sim
Não
1
N/A
Não
1
| BSB → CNF 1
| EDIMO PEREIRA ALVES DE SOUZA
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
7ec2b0b8-13f5-4ee9-96a3-5bc1f7d14cf6
web_mobile
20260213154144-996-sen
e2103b4f-2161-446b-ba2d-8e5421bebe31-v1
2026-02-13 15:41:44
996
Início de jornada
Continuar
Sim
-
-
-
-
-
-
-
-
-
-
Fernanda Diniz
+5562992527804
Não informado
IGGKTY
gyn
Sim
Sim
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
bf6a3e15-8230-4738-baae-a165305a16ed
web_mobile
20260213154223-996-dsc
92fa953b-2675-432e-b159-ac0ffbe4f80a-v1
2026-02-13 15:42:23
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
76fec92a-6f8c-4cdc-b002-84546148e454
web_mobile
20260213154226-996-tcu
86b60313-b6fa-4130-9e60-eddce75d8e19-v1
2026-02-13 15:42:26
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
f92ab1b8-cfe1-4f13-80e9-e1546a0aa2e9
web_mobile
20260213154231-996-gpp
adea86f5-a258-4dbf-b60e-5c14805242bb-v1
2026-02-13 15:42:31
996
Início de jornada
Continuar
Sim
-
-
-
-
-
-
-
-
-
-
Livia
Não informado
090.804.136-58
MR36TH
cnf
Sim
Sim
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
9f647b21-ab82-4107-99db-7376c9a3a0e5
web
20260213154233-996-gvr
af958824-43f3-48c4-98a5-350ae5c37881-v1
2026-02-13 15:42:33
996
Início de jornada
Continuar
Sim
-
-
-
-
-
-
-
-
-
-
EDIMO P A SOUZA
Não informado
065.962.846-54
XE5DUE
bsb
Sim
Não
1
N/A
Não
1
| BSB → CNF 1
| EDIMO PEREIRA ALVES DE SOUZA
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
72b11775-7ba5-4247-a13f-116929d99590
web
20260213154256-996-usq
c944bb2d-9fd4-4974-97c5-66e5eb989428-v1
2026-02-13 15:42:56
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
cab3158b-207e-497c-986c-268f3f378e6e
web_mobile
20260213154312-996-tme
7ee67d08-3adb-4bca-aae4-5b57361f4fba-v1
20260213154312
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
Não informado
Não informado
UIGL3C
ios
Sim
Não
1
N/A
Não
2
| IOS → BSB 1
| HENRIQUE PELEJA SAMPAIO DE OLIVEIRA
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
0158984f-ab29-4aa9-94bd-c69693718902
web
20260213154332-996-mfu
bd964f72-9ce0-4a67-8420-01c8a4b1848d-v1
2026-02-13 15:43:32
996
Início de jornada
Continuar
Sim
-
-
-
-
-
-
-
-
-
-
mariana
Não informado
070.764.656-12
UN97UG
cnf
Sim
Não
1
N/A
Não
1
| CNF → MCZ 1
| MARIANA CASTRO COSTA
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
a4037df4-9956-42b0-9a74-d2f77a1d08f9
web_mobile
20260213154354-996-cts
af9063db-a033-4c81-b9a1-cc7d706fdc1a-v1
2026-02-13 15:43:54
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
22ec9e6a-b70a-4ef9-8e34-3a2b639f3a13
web
20260213154355-996-acz
83e11f86-5457-47a8-88bc-db50cc08a603-v1
2026-02-13 15:43:55
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
Adriana M R Fonseca
+5531971086014
Não informado
encmuq
cnf
Sim
Não
1
N/A
Sim
2
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
1de90621-925c-4d0d-90b0-aeedb8d85b97
web_mobile
20260213154530-996-mbl
f345c44b-3f85-4ee4-b856-f630952829d4-v1
2026-02-13 15:45:30
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
Andrea
Não informado
629.223.784-20
GQ92FH
rec
Sim
Sim
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
77d76fcd-572b-4f95-8aa4-ebde1e0a463e
web_mobile
20260213154548-996-rwy
31beed5c-d504-4415-b21f-35f57fc6c945-v1
2026-02-13 15:45:48
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
d106c821-014c-453a-8fdd-6cc6c9c90572
web_mobile
20260213154550-996-fvz
5204db9b-ac8c-434a-b878-5d0ac40f368d-v1
2026-02-13 15:45:50
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
Maria
Não informado
051.830.821-97
LMJ1RG
vcp
Sim
Não
1
-
Não
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
1768306c-af67-4484-bf2c-91adc3bd55fb
web_mobile
20260213154608-996-hps
294c94de-b36e-4469-b1c4-43fc4cba6b5d-v1
2026-02-13 15:46:08
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
Carolina
Não informado
414.820.018-88
JMBLFT
cgh
Sim
Não
1
N/A
Não
1
| CGH → CNF 1
| CAROLINA OLIVEIRA DA COSTA
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
95cac578-3855-4d9d-84e2-e5a2c08ca814
web_mobile
20260213154733-996-pkb
7d1843f4-e443-4ec8-aff8-aad73919294e-v1
2026-02-13 15:47:34
996
Início de jornada
Continuar
Sim
-
-
-
-
-
-
-
-
-
-
-
Não informado
Não informado
OI2HNF
cgh
Sim
Sim
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
22ec9e6a-b70a-4ef9-8e34-3a2b639f3a13
web
20260213154744-996-hcu
83e11f86-5457-47a8-88bc-db50cc08a603-v1
2026-02-13 15:47:44
996
Início de jornada
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
8eb6c0a8-b343-4add-a9c9-7ea15b6b33ef
web_mobile
20260213154813-996-uii
srv-1771008493-996-21055122-EXPIR
2026-02-13 15:48:13
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
ad2dbece-08dd-46db-9168-cee8ca80672a
web_mobile
20260213155059-996-uum
655db296-bbd9-42cd-85d7-2e1cd1f70be5-v1
2026-02-13 15:50:59
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
Leonardo da Cunha
Não informado
090.616.679-92
OH9JUI
xap
Sim
Não
1
N/A
Não
1
| XAP → FLN 1
| Leonardo Da Cunha
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
ceae94a3-5538-4f92-be47-8c06ec7cd97b
web
20260213155221-996-oqr
0020cee9-00a2-4742-999f-48ba94228e01-v1
2026-02-13 15:52:21
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
WALLYSON MACIEL OLIVEIRA
Não informado
756.309.311-72
ZQJ8HK
gyn
Sim
Não
1
N/A
Não
1
| GYN → VCP 1
| WALLYSON OLIVEIRA
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
42ff5e4b-d7a4-48f9-8098-f09d45a27b66
web_mobile
20260213155249-996-jtu
b93c3a8a-e247-4623-97c6-52971718a712-v1
2026-02-13 15:52:49
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
FRANCIELLE
Não informado
997.711.521-49
TLDE2J
nat
Sim
Não
1
N/A
Não
2
| NAT → RAO 1
| HULLY TAINARA SILVA DE ALBUQUERQUE COELHO
Sim
Não
Não
-
-
-
-
-
-
-
-
-
-
-
-
		
8098e553-e00e-4378-bf43-3f821a5c5b9a
web_mobile
20260213155404-996-tsv
d364975c-20e0-42c0-9a21-caa32b88eb4a-v1
2026-02-13 15:54:04
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
8098e553-e00e-4378-bf43-3f821a5c5b9a
web_mobile
20260213155442-996-zqy
d364975c-20e0-42c0-9a21-caa32b88eb4a-v1
2026-02-13 15:54:42
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
d1b701dc-5ac0-4133-a4c3-eb15613bf340
web_mobile
20260213155546-996-fvv
59a7f815-90f4-403a-b2d6-5a0f79738c5c-v1
2026-02-13 15:55:46
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
Márcia
Não informado
666.667.082-53
YRR22E
mao
Sim
Sim
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
68d8f1e8-0ea7-4f6b-94ff-c8dad79e853e
web_mobile
20260213155628-996-dtf
19cc0dad-5770-42c1-be42-615d04422ee4-v1
2026-02-13 15:56:28
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
Não informado
Não informado
MFJK8Y
sdu
Sim
Sim
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
		
0c3fc41c-7dbe-4742-afb5-cc95b7e71692
web_mobile
20260213155847-996-qjh
5ee84c22-4cdc-4268-bfd4-201e94662664-v1
2026-02-13 15:58:47
996
Início de jornada
Continuar
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-`;

  const detailRows = rawMockData.split(/\n\t*\n/).map(block => block.split('\n').filter(line => line.trim() !== ''));
  const visibleRows = detailRows.slice(0, perPage);

  const isRightAligned = (colId) => {
    return colId.includes('date') || colId.includes('at') || colId.includes('total') || colId.includes('num_');
  };

  const isIdColumn = (colId) => {
    return colId.includes('id') || colId === 'protocol_number' || colId === 'cpf';
  };

  return (
    <div className="tables-page fade-in">
      
      {selectedTable ? (
        <>
          <div className="detail-view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            {/* Breadcrumb Row */}
            <div className="breadcrumbs glass-pill" style={{ margin: 0 }}>
              <Link to="/" className="breadcrumb-link" onClick={() => setSelectedTable(null)}>Home</Link>
              <ChevronIcon size={14} className="breadcrumb-separator" />
              <span className="breadcrumb-link" onClick={() => setSelectedTable(null)} style={{ cursor: 'pointer' }}>{selectedTable.empresa}</span>
              <ChevronIcon size={14} className="breadcrumb-separator" />
              <span className="breadcrumb-link" onClick={() => setSelectedTable(null)} style={{ cursor: 'pointer' }}>{selectedTable.departamento}</span>
              <ChevronIcon size={14} className="breadcrumb-separator" />
              <span className="breadcrumb-current">{selectedTable.name}</span>
            </div>

            {/* Actions Row */}
            <div className="detail-title-right" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button className="btn-filter-toolbar" onClick={() => setShowAIFilter(true)}>
                <Sparkles size={14} color="var(--blue-mid)" />
                Filtros com IA
              </button>

              <div className="actions-dropdown-wrapper" style={{ position: 'relative' }}>
                <button className="btn-actions-primary" onClick={(e) => { e.stopPropagation(); setOpenActionsModal(!openActionsModal); }}>
                  Ações <ChevronIcon size={14} />
                </button>
                {openActionsModal && (
                  <div className="popover-menu glass-popover right-align">
                    <button className="popover-item"><Plus size={14} /> Nova Coluna</button>
                    <button className="popover-item"><Upload size={14} /> Importar Dados</button>
                    <button className="popover-item"><Download size={14} /> Exportar Dados (CSV)</button>
                    <button className="popover-item"><Download size={14} /> Exportar Estrutura (JSON)</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* VISÃO DETALHADA DA TABELA */}
          <div className="table-container detail-view-container fade-in">
            <div className="detail-table-wrapper premium-scroll">
              <table className="data-table detail-table premium-table">
                <thead>
                  <tr>
                    {detailColumns.map(col => (
                      <th key={col.id} className={isRightAligned(col.id) ? 'text-right' : 'text-left'}>
                        <div className="col-header-content" style={{ justifyContent: isRightAligned(col.id) ? 'flex-end' : 'space-between' }}>
                          <div className="col-header-text" style={{ alignItems: isRightAligned(col.id) ? 'flex-end' : 'flex-start' }}>
                            <span className="col-name">{col.name}</span>
                            <span className="col-id">{col.id}</span>
                          </div>
                          {!isRightAligned(col.id) && (
                            <div className="col-options-wrapper">
                              <button className="btn-col-more" onClick={(e) => { e.stopPropagation(); setOpenColPopover(openColPopover === col.id ? null : col.id); }}>
                                <MoreVertical size={14} />
                              </button>
                              {openColPopover === col.id && (
                                <div className="popover-menu glass-popover">
                                  <button className="popover-item"><Edit2 size={14} /> Renomear coluna</button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row, rIndex) => (
                    <tr key={rIndex}>
                      {detailColumns.map((col, cIndex) => {
                        const val = row[cIndex] || '-';
                        const alignClass = isRightAligned(col.id) ? 'text-right' : 'text-left';
                        
                        return (
                          <td key={col.id} className={alignClass}>
                            {isIdColumn(col.id) ? (
                              <TruncatableId value={val} />
                            ) : (
                              <span className={isRightAligned(col.id) ? 'cell-secondary' : 'cell-primary'}>
                                {val}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RODAPÉ DETALHADO PREMIUM */}
            <div className="premium-table-footer">
              <div className="premium-footer-info" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span><span className="premium-highlight">{Math.min(perPage, detailRows.length)}</span> de <span className="premium-highlight">{detailRows.length}</span> resultados</span>
                <select 
                  className="premium-select-inline" 
                  value={perPage} 
                  onChange={(e) => setPerPage(Number(e.target.value))}
                >
                  <option value={15}>15 por página</option>
                  <option value={50}>50 por página</option>
                  <option value={100}>100 por página</option>
                  <option value={500}>500 por página</option>
                  <option value={1000}>1000 por página</option>
                </select>
              </div>
              
              <div className="premium-pagination">
                <button className="btn-premium-page disabled"><ChevronLeft size={14} /></button>
                <div className="premium-page-numbers">
                  <button className="btn-premium-num active">1</button>
                  <button className="btn-premium-num">2</button>
                  <button className="btn-premium-num">3</button>
                  <span className="premium-ellipsis">...</span>
                  <button className="btn-premium-num">258</button>
                </div>
                <button className="btn-premium-page"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* BREADCRUMBS LISTAGEM */}
          <div className="breadcrumbs glass-pill">
            <Link to="/" className="breadcrumb-link" onClick={() => setSelectedTable(null)}>Home</Link>
            <ChevronIcon size={14} className="breadcrumb-separator" />
            <span className="breadcrumb-current">Tabelas</span>
          </div>

          {/* BARRA DE FERRAMENTAS LISTAGEM */}
          <div className="toolbar">
            <div className="toolbar-left">
              <div className="input-search-wrapper">
                <Search size={14} className="input-search-icon" />
                <input type="text" className="toolbar-input" placeholder="Buscar tabelas..." />
              </div>
              <select className="toolbar-select">
                <option>50 itens</option>
                <option>100 itens</option>
                <option>200 itens</option>
              </select>
            </div>
            <div className="toolbar-right">
              <button className="btn-filter-toolbar">
                <Filter size={14} />
                Filtros
              </button>
              <button className="btn-create-new">
                <Plus size={14} />
                Criar Nova
              </button>
            </div>
          </div>

          {/* LISTAGEM DE TABELAS */}
          <div className="table-container fade-in">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nome da Tabela</th>
                  <th>Empresa / Departamento</th>
                  <th>Bot ID</th>
                  <th>Total de Linhas</th>
                  <th>Criada Em</th>
                  <th>Alterada Em</th>
                  <th>Ações</th>
                  <th>Opções</th>
                </tr>
              </thead>
              <tbody>
                {tablesData.map((row) => {
                  const widthPct = Math.max(2, (row.linhas / row.maxLinhas) * 100);
                  return (
                    <tr key={row.id}>
                      <td className="cell-name">{row.name}</td>
                      <td className="cell-env">{row.empresa} / {row.departamento}</td>
                      <td className="cell-secondary">{row.botId}</td>
                      <td>
                        <div className="cell-lines-wrapper">
                          <span className="cell-lines-number">{row.linhas.toLocaleString('pt-BR')}</span>
                          <div className="cell-lines-bar-bg">
                            <div className="cell-lines-bar-fill" style={{ width: `${widthPct}%`, background: 'var(--blue-mid)' }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="cell-secondary">{row.criadaEm}</td>
                      <td className="cell-secondary">{row.alteradaEm}</td>
                      <td>
                        <div className="actions-cell">
                          <button className="btn-open" onClick={() => setSelectedTable(row)}>
                            <Eye size={12} /> Abrir
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="options-cell-wrapper">
                          <button className="btn-more" onClick={(e) => { e.stopPropagation(); setOpenRowPopover(openRowPopover === row.id ? null : row.id); }}>
                            <MoreVertical size={14} />
                          </button>
                          {openRowPopover === row.id && (
                            <div className="popover-menu glass-popover right-align">
                              <button className="popover-item"><Key size={14} /> Gerenciar Chave API</button>
                              <button className="popover-item"><Download size={14} /> Exportar (CSV)</button>
                              <div className="popover-divider"></div>
                              <button className="popover-item danger-item"><Trash size={14} /> Excluir</button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="premium-table-footer">
              <div className="premium-footer-info">
                <span><span className="premium-highlight">5</span> de <span className="premium-highlight">105</span> resultados</span>
              </div>
              
              <div className="premium-pagination">
                <button className="btn-premium-page disabled"><ChevronLeft size={14} /></button>
                <div className="premium-page-numbers">
                  <button className="btn-premium-num active">1</button>
                  <button className="btn-premium-num">2</button>
                  <button className="btn-premium-num">3</button>
                  <span className="premium-ellipsis">...</span>
                  <button className="btn-premium-num">21</button>
                </div>
                <button className="btn-premium-page"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* AI Filter Modal */}
      {showAIFilter && (
        <div className="modal-overlay" onClick={handleCloseAIFilter}>
          <div className="apple-filter-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="btn-close-modal" onClick={handleCloseAIFilter}>
              <X size={18} />
            </button>
            <div className="filter-header" style={{ marginBottom: '16px' }}>
              <h3>Filtros com IA</h3>
            </div>
            
            <div className="ai-agent-container" style={{ background: 'var(--bg-page)', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid var(--border)', minHeight: '160px' }}>
              {aiStep === 'loading_welcome' ? (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Conectando Inteligência Artificial...</span>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--blue-mid)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 'bold', fontSize: '12px' }}>IA</div>
                    <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '0 12px 12px 12px', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text)', lineHeight: '1.5' }}>
                      {aiStep === 'success' 
                        ? 'Pronto! Encontrei os dados que procura. Basta clicar em "Aplicar Filtros" para carregar os seus dados 😉'
                        : 'Olá. Posso ajudá-lo com os filtros? Basta me dizer o que deseja que aplicarei a regra necessária para que possa retornar os dados que procura.'}
                    </div>
                  </div>
                  
                  <textarea 
                    placeholder="Descreva o filtro que deseja e pressione Enter..."
                    value={aiFilterText}
                    onChange={(e) => setAiFilterText(e.target.value)}
                    onKeyDown={handleKeyDownAI}
                    disabled={aiStep === 'processing' || aiStep === 'success'}
                    onFocus={(e) => e.target.style.borderColor = 'var(--blue-mid)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                    style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text)', fontSize: '13px', resize: 'none', outline: 'none', fontFamily: 'inherit', transition: 'border-color 200ms ease', opacity: (aiStep === 'processing' || aiStep === 'success') ? 0.6 : 1 }}
                  />
                </>
              )}
            </div>

            <div className="filter-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', alignItems: 'center' }}>
              {aiStep === 'processing' && (
                <span style={{ fontSize: '13px', color: 'var(--blue-mid)', fontWeight: 500 }}>Processando os filtros...</span>
              )}
              {aiStep === 'success' && (
                <>
                  <button className="apple-btn-ghost" onClick={handleCloseAIFilter}>Cancelar</button>
                  <button className="apple-btn-primary" onClick={handleCloseAIFilter}>Aplicar Filtros</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
