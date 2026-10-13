// ============================================
// CONSTANTES GLOBAIS DA APLICAÇÃO
// ============================================

// Status dos Materiais
export const STATUS = {
    EM_ESTOQUE: 'Em Estoque',
    FINALIZADO: 'Finalizado',
    TODOS: 'Todos',
    PENDENTE: 'Pendente',
};

// Status da Triagem
export const STATUS_TRIAGEM = {
    ATENDIDO: 'Atendido',
    TODOS: 'Todos',
};

// Prazos de Permanência em Dias
export const PRAZOS_PERMANENCIA = {
    DOIS_MESES: 60,
    QUATRO_MESES: 120,
    SEIS_MESES: 180,
};

// Limites de Alerta em Dias para o status de prazo
export const ALERT_DAYS = {
    VENCENDO: 5,
    PROXIMO: 15,
};

// Configurações de Paginação
export const PAGINATION_DEFAULTS = {
    ITENS_POR_PAGINA: 20,
    PAGINA_ATUAL: 1,
};

// IDs de Serviço (Exemplo, idealmente viriam de variáveis de ambiente)
export const EMAILJS_CONFIG = {
    SERVICE_ID: "service_lbetuzu",
    TEMPLATE_CONFIRMACAO: "template_p6qgrip",
};

// Opções para selects
export const UNIDADES_MEDIDA = [
    { value: "Unidades", label: "Unidades (un)" },
    { value: "Quilos", label: "Quilos (kg)" },
    { value: "Litros", label: "Litros (L)" },
    { value: "Caixas", label: "Caixas (cx)" },
];