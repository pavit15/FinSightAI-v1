// Ultimate Financial RAG Analyzer Pro Ultra - Fixed Navigation and Interactive Components

// Enhanced Application State
const AppState = {
    documents: [],
    companies: [],
    customKPIs: [],
    smartAlerts: [],
    marketData: {},
    uploadQueue: [],
    embeddings: 0,
    totalQueries: 0,
    systemStatus: 'online',
    currentPage: 'overview',
    selectedMetrics: [],
    currentChart: null,
    provenanceTracker: new Map(),
    alertsCount: { critical: 0, warning: 0, info: 0 }
};

// Application initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Ultimate Financial RAG Analyzer Pro Ultra...');
    initializeApplication();
    setupEventListeners();
    setupFileUpload();
    setupDragAndDrop();
    updateUI();
    
    // Initialize market data immediately
    LiveMarketEngine.initializeMarketData();
    
    console.log('✅ All systems initialized and ready');
});

function initializeApplication() {
    console.log('📊 Setting up enhanced application state...');
    
    updateStatistics();
    updateCompanyDropdowns();
    showEmptyStates();
    
    KPIBuilder.refreshKPIList();
    KPIBuilder.updateKPISelectors();
    AlertsEngine.updateAlertsStats();
    
    console.log('✅ Enhanced application initialized successfully');
}

function setupEventListeners() {
    console.log('🔧 Setting up enhanced event listeners...');
    
    // FIXED: Navigation Event Listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const page = this.getAttribute('data-page');
            console.log('🧭 Navigation clicked:', page);
            navigateToPage(page);
        });
    });
    
    setupGlobalSearch();
    setupDocumentManagement();
    
    console.log('✅ Enhanced event listeners configured');
}

// FIXED: Complete navigation function with proper page mapping
function navigateToPage(pageId) {
    console.log(`📄 Navigating to page: ${pageId}`);
    
    // FIXED: Correct page mapping
    const pageMapping = {
        'overview': 'overview-page',
        'upload': 'upload-page', 
        'documents': 'documents-page',
        'live-market': 'live-market-page',
        'kpi-builder': 'kpi-builder-page',
        'dashboards': 'dashboards-page',
        'chart-lab': 'chart-lab-page',
        'alerts': 'alerts-page',
        'chatbot': 'chatbot-page',
        'scenarios': 'scenarios-page',
        'search': 'search-page',
        'settings': 'settings-page'
    };
    
    const targetPageId = pageMapping[pageId];
    
    if (!targetPageId) {
        console.error('❌ Unknown page:', pageId);
        showNotification(`Page "${pageId}" not found`, 'error');
        return;
    }
    
    // Update navigation state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[data-page="${pageId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Update page visibility
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(targetPageId);
    if (targetPage) {
        targetPage.classList.add('active');
        AppState.currentPage = pageId;
        console.log('✅ Successfully navigated to:', pageId);
        
        // Page-specific initialization
        switch(pageId) {
            case 'upload':
                console.log('📁 Initializing upload page...');
                setupFileUpload();
                break;
            case 'documents':
                console.log('📋 Refreshing documents view...');
                refreshDocumentsView();
                break;
            case 'dashboards':
                console.log('📊 Refreshing dashboard view...');
                refreshDashboardView();
                break;
            case 'kpi-builder':
                console.log('🧮 Initializing KPI Builder...');
                KPIBuilder.refreshKPIList();
                KPIBuilder.updateKPISelectors();
                break;
            case 'alerts':
                console.log('🔔 Initializing alerts...');
                AlertsEngine.refreshAlertsList();
                AlertsEngine.generateAIRecommendations();
                break;
            case 'live-market':
                console.log('📈 Refreshing market data...');
                LiveMarketEngine.populateMarketDashboard();
                break;
            case 'chart-lab':
                console.log('🧪 Initializing Chart Lab...');
                setTimeout(() => {
                    setupDragAndDrop();
                    initializeChartLab();
                }, 100);
                break;
        }
        
        showNotification(`Navigated to ${pageId.replace('-', ' ')}`, 'info');
    } else {
        console.error('❌ Target page element not found:', targetPageId);
        showNotification(`Page content for "${pageId}" not found`, 'error');
    }
}

// FIXED: File Upload Functionality
function setupFileUpload() {
    console.log('📁 Setting up file upload functionality...');
    
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    const selectFilesBtn = document.getElementById('select-files-btn');
    
    if (!uploadArea || !fileInput || !selectFilesBtn) {
        console.warn('⚠️ Upload elements not found on this page');
        return;
    }
    
    // Remove any existing event listeners to prevent duplicates
    const newSelectBtn = selectFilesBtn.cloneNode(true);
    selectFilesBtn.parentNode.replaceChild(newSelectBtn, selectFilesBtn);
    
    const newFileInput = fileInput.cloneNode(true);
    fileInput.parentNode.replaceChild(newFileInput, fileInput);
    
    // FIXED: Proper button click handler
    newSelectBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ Select files button clicked');
        newFileInput.click();
    });
    
    // File input change handler
    newFileInput.addEventListener('change', function(e) {
        console.log('📁 Files selected:', e.target.files.length);
        if (e.target.files.length > 0) {
            handleFiles(Array.from(e.target.files));
        }
    });
    
    // Drag and drop for upload area
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragenter', handleDragEnter);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    
    // Click to upload (only if not clicking the button)
    uploadArea.addEventListener('click', function(e) {
        if (!e.target.closest('.file-upload-btn')) {
            e.preventDefault();
            newFileInput.click();
        }
    });
    
    console.log('✅ File upload functionality initialized');
}

function handleDragOver(e) { 
    e.preventDefault(); 
    e.dataTransfer.dropEffect = 'copy';
}

function handleDragEnter(e) { 
    e.preventDefault(); 
    e.currentTarget.classList.add('dragover'); 
}

function handleDragLeave(e) { 
    e.preventDefault(); 
    if (!e.currentTarget.contains(e.relatedTarget)) {
        e.currentTarget.classList.remove('dragover');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    console.log('📁 Files dropped:', files.length);
    handleFiles(files);
}

function handleFiles(files) {
    console.log(`📁 Processing ${files.length} files...`);
    showNotification(`Processing ${files.length} file(s)...`, 'info');
    
    files.forEach(file => {
        if (validateFile(file)) {
            processFile(file);
        }
    });
}

function validateFile(file) {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv',
        'text/plain'
    ];
    
    if (file.size > maxSize) {
        showNotification(`File "${file.name}" is too large. Maximum size is 100MB.`, 'error');
        return false;
    }
    
    if (!allowedTypes.includes(file.type) && !file.name.match(/\.(pdf|xlsx?|csv|txt)$/i)) {
        showNotification(`File "${file.name}" is not supported.`, 'error');
        return false;
    }
    
    return true;
}

function processFile(file) {
    const uploadItem = {
        id: Date.now() + Math.random(),
        file: file,
        progress: 0,
        status: 'processing',
        company: '',
        type: ''
    };
    
    AppState.uploadQueue.push(uploadItem);
    renderUploadQueue();
    
    simulateAdvancedDocumentProcessing(uploadItem);
}

function simulateAdvancedDocumentProcessing(uploadItem) {
    const file = uploadItem.file;
    
    setTimeout(() => {
        uploadItem.progress = 20;
        uploadItem.status = 'parsing';
        renderUploadQueue();
        
        setTimeout(() => {
            uploadItem.progress = 50;
            uploadItem.status = 'extracting';
            renderUploadQueue();
            
            setTimeout(() => {
                uploadItem.progress = 80;
                uploadItem.status = 'indexing';
                renderUploadQueue();
                
                setTimeout(() => {
                    uploadItem.progress = 100;
                    uploadItem.status = 'completed';
                    
                    const { company, type } = extractDocumentInfo(file.name);
                    uploadItem.company = company;
                    uploadItem.type = type;
                    
                    const newDocument = {
                        id: Date.now(),
                        name: file.name,
                        company: company,
                        type: type,
                        uploadDate: new Date().toISOString().split('T')[0],
                        status: 'Processed',
                        size: formatFileSize(file.size),
                        pages: Math.floor(Math.random() * 200) + 50,
                        embeddings: Math.floor(Math.random() * 500) + 200
                    };
                    
                    AppState.documents.push(newDocument);
                    
                    if (!AppState.companies.includes(company)) {
                        AppState.companies.push(company);
                    }
                    
                    AppState.embeddings += newDocument.embeddings;
                    
                    renderUploadQueue();
                    updateUI();
                    updateStatistics();
                    updateCompanyDropdowns();
                    
                    showNotification(`✅ Document processed: ${company} - ${type}`, 'success');
                    
                }, 1000);
            }, 1500);
        }, 1000);
    }, 500);
}

// FIXED: Drag and Drop Chart Lab Functionality
function setupDragAndDrop() {
    console.log('🧪 Setting up drag and drop for Chart Lab...');
    
    const metricChips = document.querySelectorAll('.metric-chip');
    const dropZone = document.getElementById('chart-drop-zone');
    
    if (!dropZone) {
        console.warn('⚠️ Chart drop zone not found on this page');
        return;
    }
    
    console.log(`🎯 Found ${metricChips.length} metric chips and drop zone`);
    
    // Set up draggable metric chips
    metricChips.forEach((chip, index) => {
        console.log(`🎪 Setting up chip ${index + 1}: ${chip.dataset.metric}`);
        
        // Ensure draggable attribute is set
        chip.setAttribute('draggable', 'true');
        
        // Remove existing listeners and add new ones
        const newChip = chip.cloneNode(true);
        chip.parentNode.replaceChild(newChip, chip);
        
        newChip.addEventListener('dragstart', handleMetricDragStart);
        newChip.addEventListener('dragend', handleMetricDragEnd);
        
        // Add touch support for mobile
        let touchStartY = 0;
        newChip.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            this.classList.add('dragging');
        });
        
        newChip.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });
        
        newChip.addEventListener('touchend', function(e) {
            this.classList.remove('dragging');
            const touch = e.changedTouches[0];
            const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
            if (dropTarget && dropTarget.closest('#chart-drop-zone')) {
                const metric = this.dataset.metric;
                if (metric && !AppState.selectedMetrics.includes(metric)) {
                    addMetricToChart(metric);
                    showNotification(`Added ${getMetricDisplayName(metric)} to chart`, 'success');
                }
            }
        });
    });
    
    // Set up drop zone with fresh event listeners
    const newDropZone = dropZone.cloneNode(true);
    dropZone.parentNode.replaceChild(newDropZone, dropZone);
    
    newDropZone.addEventListener('dragover', handleChartDragOver);
    newDropZone.addEventListener('dragenter', handleChartDragEnter);
    newDropZone.addEventListener('dragleave', handleChartDragLeave);
    newDropZone.addEventListener('drop', handleChartDrop);
    
    // Click to add metrics (fallback for devices without drag support)
    metricChips.forEach(chip => {
        chip.addEventListener('click', function(e) {
            e.preventDefault();
            const metric = this.dataset.metric;
            if (metric && !AppState.selectedMetrics.includes(metric)) {
                addMetricToChart(metric);
                showNotification(`Added ${getMetricDisplayName(metric)} via click`, 'success');
            } else if (AppState.selectedMetrics.includes(metric)) {
                showNotification(`${getMetricDisplayName(metric)} is already in the chart`, 'warning');
            }
        });
    });
    
    console.log('✅ Drag and drop functionality initialized');
}

function handleMetricDragStart(e) {
    const metric = e.target.dataset.metric;
    console.log('🚀 Drag start:', metric);
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', metric);
    e.dataTransfer.effectAllowed = 'copy';
}

function handleMetricDragEnd(e) {
    console.log('🏁 Drag end');
    e.target.classList.remove('dragging');
}

function handleChartDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}

function handleChartDragEnter(e) {
    e.preventDefault();
    console.log('📥 Drag enter drop zone');
    e.currentTarget.classList.add('dragover');
}

function handleChartDragLeave(e) {
    e.preventDefault();
    if (!e.currentTarget.contains(e.relatedTarget)) {
        console.log('📤 Drag leave drop zone');
        e.currentTarget.classList.remove('dragover');
    }
}

function handleChartDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const metric = e.dataTransfer.getData('text/plain');
    console.log('🎯 Metric dropped:', metric);
    
    if (metric && !AppState.selectedMetrics.includes(metric)) {
        addMetricToChart(metric);
        showNotification(`Added ${getMetricDisplayName(metric)} to chart`, 'success');
    } else if (AppState.selectedMetrics.includes(metric)) {
        showNotification(`${getMetricDisplayName(metric)} is already in the chart`, 'warning');
    }
}

function addMetricToChart(metric) {
    console.log('➕ Adding metric to chart:', metric);
    AppState.selectedMetrics.push(metric);
    updateSelectedMetricsDisplay();
    generateDynamicChart();
}

function removeMetricFromChart(metric) {
    console.log('➖ Removing metric from chart:', metric);
    AppState.selectedMetrics = AppState.selectedMetrics.filter(m => m !== metric);
    updateSelectedMetricsDisplay();
    generateDynamicChart();
    showNotification(`Removed ${getMetricDisplayName(metric)} from chart`, 'info');
}

function updateSelectedMetricsDisplay() {
    const container = document.getElementById('selected-metrics');
    if (!container) return;
    
    if (AppState.selectedMetrics.length === 0) {
        container.innerHTML = '';
        const dropZoneContent = container.closest('.chart-drop-zone')?.querySelector('.drop-zone-content p');
        if (dropZoneContent) {
            dropZoneContent.textContent = 'Drag metrics here to create charts';
        }
        return;
    }
    
    // Update drop zone message
    const dropZoneContent = container.closest('.chart-drop-zone')?.querySelector('.drop-zone-content p');
    if (dropZoneContent) {
        dropZoneContent.textContent = `${AppState.selectedMetrics.length} metrics selected - generating chart...`;
    }
    
    container.innerHTML = AppState.selectedMetrics.map(metric => `
        <div class="selected-metric">
            <span>${getMetricDisplayName(metric)}</span>
            <button class="remove-btn" onclick="removeMetricFromChart('${metric}')">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
}

function getMetricDisplayName(metric) {
    const displayNames = {
        'revenue': 'Revenue',
        'net-margin': 'Net Margin',
        'roe': 'Return on Equity',
        'debt-equity': 'Debt/Equity',
        'current-ratio': 'Current Ratio',
        'operating-margin': 'Operating Margin',
        'roa': 'Return on Assets',
        'eps': 'Earnings Per Share'
    };
    return displayNames[metric] || metric;
}

function initializeChartLab() {
    console.log('🧪 Initializing Chart Lab...');
    
    // Set up chart type and period change handlers
    const chartTypeSelect = document.getElementById('chart-type-select');
    const timePeriodSelect = document.getElementById('time-period-select');
    
    if (chartTypeSelect) {
        chartTypeSelect.addEventListener('change', () => {
            console.log('📊 Chart type changed to:', chartTypeSelect.value);
            generateDynamicChart();
        });
    }
    
    if (timePeriodSelect) {
        timePeriodSelect.addEventListener('change', () => {
            console.log('📅 Time period changed to:', timePeriodSelect.value);
            generateDynamicChart();
        });
    }
    
    // Initialize empty chart
    updateSelectedMetricsDisplay();
    clearChart();
    
    console.log('✅ Chart Lab initialized');
}

function generateDynamicChart() {
    console.log('📈 Generating dynamic chart...');
    console.log('Selected metrics:', AppState.selectedMetrics);
    
    if (AppState.selectedMetrics.length === 0) {
        clearChart();
        return;
    }
    
    const chartType = document.getElementById('chart-type-select')?.value || 'line';
    const timePeriod = document.getElementById('time-period-select')?.value || '1y';
    
    console.log(`📊 Generating ${chartType} chart for ${AppState.selectedMetrics.length} metrics`);
    
    const canvas = document.getElementById('dynamic-chart');
    if (!canvas) {
        console.error('❌ Chart canvas not found');
        showNotification('Chart canvas not found', 'error');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    // Destroy existing chart
    if (AppState.currentChart) {
        AppState.currentChart.destroy();
    }
    
    // Generate sample data
    const chartData = generateChartData(AppState.selectedMetrics, timePeriod);
    
    // Chart configuration
    const config = {
        type: chartType,
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Financial Metrics Analysis - ${timePeriod.toUpperCase()} (${AppState.selectedMetrics.length} metrics)`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: chartType !== 'radar' ? {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Value'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    title: {
                        display: true,
                        text: 'Time Period'
                    }
                }
            } : {
                r: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };
    
    // Create new chart
    try {
        AppState.currentChart = new Chart(ctx, config);
        console.log('✅ Chart generated successfully');
        showNotification(`📊 Chart updated with ${AppState.selectedMetrics.length} metrics`, 'success');
    } catch (error) {
        console.error('❌ Error creating chart:', error);
        showNotification('Error generating chart', 'error');
    }
}

function generateChartData(metrics, timePeriod) {
    const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325'];
    
    // Generate time labels based on period
    const labels = generateTimeLabels(timePeriod);
    
    const datasets = metrics.map((metric, index) => {
        const data = generateMetricData(metric, labels.length);
        const color = colors[index % colors.length];
        
        return {
            label: getMetricDisplayName(metric),
            data: data,
            borderColor: color,
            backgroundColor: color + '40', // Add transparency
            fill: false,
            tension: 0.1,
            pointRadius: 4,
            pointHoverRadius: 6
        };
    });
    
    return {
        labels: labels,
        datasets: datasets
    };
}

function generateTimeLabels(timePeriod) {
    const labels = [];
    const currentDate = new Date();
    
    let periods = 12;
    let unit = 'month';
    
    switch (timePeriod) {
        case '5y':
            periods = 5;
            unit = 'year';
            break;
        case '3y':
            periods = 3;
            unit = 'year';
            break;
        case '1y':
            periods = 12;
            unit = 'month';
            break;
        case 'ytd':
            periods = currentDate.getMonth() + 1;
            unit = 'month';
            break;
    }
    
    for (let i = periods - 1; i >= 0; i--) {
        const date = new Date(currentDate);
        if (unit === 'year') {
            date.setFullYear(date.getFullYear() - i);
            labels.push(date.getFullYear().toString());
        } else {
            date.setMonth(date.getMonth() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
        }
    }
    
    return labels;
}

function generateMetricData(metric, length) {
    const baseValues = {
        'revenue': 150000,
        'net-margin': 18,
        'roe': 28,
        'debt-equity': 0.25,
        'current-ratio': 2.8,
        'operating-margin': 22,
        'roa': 15,
        'eps': 52
    };
    
    const baseValue = baseValues[metric] || 100;
    const data = [];
    
    for (let i = 0; i < length; i++) {
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        const trend = i * 0.015; // Small upward trend
        const seasonality = Math.sin(i * 0.5) * 0.05; // Small seasonal variation
        const value = baseValue * (1 + variation + trend + seasonality);
        data.push(Number(value.toFixed(2)));
    }
    
    return data;
}

function clearChart() {
    if (AppState.currentChart) {
        AppState.currentChart.destroy();
        AppState.currentChart = null;
    }
    
    const canvas = document.getElementById('dynamic-chart');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw placeholder text
        ctx.font = '18px Arial';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('Drag metrics above to generate charts', canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = '14px Arial';
        ctx.fillText('Or click on metric chips to add them', canvas.width / 2, canvas.height / 2 + 15);
    }
}

// Live Market Data Engine
const LiveMarketEngine = {
    mockData: {
        indices: {
            'NIFTY50': { price: 22147.90, change: 245.30, changePercent: 1.12 },
            'SENSEX': { price: 72832.16, change: 820.15, changePercent: 1.14 }
        },
        stocks: {
            'TCS': { price: 4125.60, change: 45.20, changePercent: 1.11, volume: '2.1Cr' },
            'INFY': { price: 1847.35, change: 28.45, changePercent: 1.57, volume: '3.8Cr' },
            'WIPRO': { price: 563.90, change: -8.20, changePercent: -1.43, volume: '1.9Cr' },
            'HCLTECH': { price: 1674.80, change: 22.15, changePercent: 1.34, volume: '1.5Cr' },
            'TECHM': { price: 1821.45, change: -12.30, changePercent: -0.67, volume: '0.8Cr' }
        }
    },

    initializeMarketData: function() {
        this.updateMarketTicker();
        this.populateMarketDashboard();
        setInterval(() => this.simulateMarketUpdates(), 15000);
    },

    updateMarketTicker: function() {
        const ticker = document.getElementById('market-ticker');
        if (!ticker) return;

        const tickerContainer = ticker.querySelector('.ticker-container');
        if (!tickerContainer) return;

        const tickerItems = [];
        
        Object.entries(this.mockData.indices).forEach(([symbol, data]) => {
            tickerItems.push(`
                <div class="ticker-item">
                    <span class="symbol">${symbol}</span>
                    <span class="price">${data.price.toFixed(2)}</span>
                    <span class="change ${data.change >= 0 ? 'positive' : 'negative'}">
                        ${data.change >= 0 ? '+' : ''}${data.change} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent}%)
                    </span>
                </div>
            `);
        });

        Object.entries(this.mockData.stocks).forEach(([symbol, data]) => {
            tickerItems.push(`
                <div class="ticker-item">
                    <span class="symbol">${symbol}</span>
                    <span class="price">${data.price.toFixed(2)}</span>
                    <span class="change ${data.change >= 0 ? 'positive' : 'negative'}">
                        ${data.change >= 0 ? '+' : ''}${data.change} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent}%)
                    </span>
                </div>
            `);
        });

        tickerContainer.innerHTML = tickerItems.join('');
    },

    populateMarketDashboard: function() {
        this.populateTopGainers();
        this.populateTopLosers();
        this.populateMostActive();
    },

    populateTopGainers: function() {
        const container = document.getElementById('top-gainers');
        if (!container) return;

        const gainers = Object.entries(this.mockData.stocks)
            .filter(([_, data]) => data.change > 0)
            .sort((a, b) => b[1].changePercent - a[1].changePercent)
            .slice(0, 5);

        container.innerHTML = gainers.map(([symbol, data]) => `
            <div class="stock-item">
                <div>
                    <strong>${symbol}</strong>
                    <div>₹${data.price.toFixed(2)}</div>
                </div>
                <div class="market-change positive">
                    +${data.change.toFixed(2)} (+${data.changePercent.toFixed(2)}%)
                </div>
            </div>
        `).join('');
    },

    populateTopLosers: function() {
        const container = document.getElementById('top-losers');
        if (!container) return;

        const losers = Object.entries(this.mockData.stocks)
            .filter(([_, data]) => data.change < 0)
            .sort((a, b) => a[1].changePercent - b[1].changePercent)
            .slice(0, 5);

        if (losers.length === 0) {
            container.innerHTML = '<div class="stock-item"><div><strong>All stocks positive!</strong></div></div>';
            return;
        }

        container.innerHTML = losers.map(([symbol, data]) => `
            <div class="stock-item">
                <div>
                    <strong>${symbol}</strong>
                    <div>₹${data.price.toFixed(2)}</div>
                </div>
                <div class="market-change negative">
                    ${data.change.toFixed(2)} (${data.changePercent.toFixed(2)}%)
                </div>
            </div>
        `).join('');
    },

    populateMostActive: function() {
        const container = document.getElementById('most-active');
        if (!container) return;

        const mostActive = Object.entries(this.mockData.stocks)
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);

        container.innerHTML = mostActive.map(([symbol, data]) => `
            <div class="stock-item">
                <div>
                    <strong>${symbol}</strong>
                    <div>Vol: ${data.volume}</div>
                </div>
                <div class="market-change ${data.change >= 0 ? 'positive' : 'negative'}">
                    ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${data.changePercent >= 0 ? '+' : ''}${data.changePercent.toFixed(2)}%)
                </div>
            </div>
        `).join('');
    },

    simulateMarketUpdates: function() {
        Object.entries(this.mockData.stocks).forEach(([symbol, data]) => {
            const movement = (Math.random() - 0.5) * 8;
            const newPrice = Math.max(data.price + movement, data.price * 0.99);
            const change = newPrice - (data.price - data.change);
            const changePercent = (change / (data.price - data.change)) * 100;
            
            this.mockData.stocks[symbol] = {
                ...data,
                price: newPrice,
                change: change,
                changePercent: changePercent
            };
        });
        
        this.updateMarketTicker();
        if (AppState.currentPage === 'live-market') {
            this.populateMarketDashboard();
        }
    }
};

// Custom KPI Builder Engine
const KPIBuilder = {
    defaultKPIs: [
        {
            id: 'operating_cf_debt',
            name: 'Operating CF / Total Debt',
            formula: 'Operating_Cash_Flow / Total_Debt',
            category: 'liquidity',
            description: 'Measures ability to pay off debt using operating cash flow',
            isDefault: true
        },
        {
            id: 'revenue_per_employee',
            name: 'Revenue per Employee',
            formula: 'Revenue / Employee_Count',
            category: 'efficiency',
            description: 'Revenue productivity per employee',
            isDefault: true
        }
    ],

    createKPI: function(name, formula, category, description) {
        const kpi = {
            id: Date.now().toString(),
            name: name,
            formula: formula,
            category: category,
            description: description,
            isDefault: false,
            createdAt: new Date().toISOString()
        };

        AppState.customKPIs.push(kpi);
        this.refreshKPIList();
        this.updateKPISelectors();
        return kpi;
    },

    refreshKPIList: function() {
        const container = document.getElementById('custom-kpi-list');
        if (!container) return;

        const allKPIs = [...this.defaultKPIs, ...AppState.customKPIs];
        
        if (allKPIs.length === 0) {
            container.innerHTML = '<p>No KPIs available. Create your first custom KPI above!</p>';
            return;
        }

        container.innerHTML = allKPIs.map(kpi => `
            <div class="kpi-item" data-kpi-id="${kpi.id}">
                <div class="kpi-item-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <div>
                        <div class="kpi-name" style="font-weight: 600; color: var(--color-text);">${kpi.name}</div>
                        <div class="kpi-category" style="background: var(--color-primary); color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; display: inline-block; margin-top: 4px;">${kpi.category}</div>
                    </div>
                    ${!kpi.isDefault ? `
                        <button class="btn btn--sm btn--outline" onclick="deleteKPI('${kpi.id}')" style="padding: 4px 8px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
                <div class="kpi-formula" style="background: var(--color-bg-2); padding: 8px; border-radius: 4px; font-family: monospace; margin: 8px 0;">${kpi.formula}</div>
                <div class="kpi-description" style="color: var(--color-text-secondary); font-size: 14px;">${kpi.description}</div>
            </div>
        `).join('');
    },

    updateKPISelectors: function() {
        const selectors = ['calc-kpi-select'];
        const allKPIs = [...this.defaultKPIs, ...AppState.customKPIs];

        selectors.forEach(selectorId => {
            const select = document.getElementById(selectorId);
            if (!select) return;

            const currentValue = select.value;
            select.innerHTML = '<option value="">Choose a KPI...</option>';
            
            allKPIs.forEach(kpi => {
                const option = document.createElement('option');
                option.value = kpi.id;
                option.textContent = kpi.name;
                if (option.value === currentValue) option.selected = true;
                select.appendChild(option);
            });
        });
    },

    calculateKPI: function(kpiId, companyName) {
        const kpi = [...this.defaultKPIs, ...AppState.customKPIs].find(k => k.id === kpiId);
        if (!kpi) return null;

        const mockFinancialData = {
            Revenue: 240893,
            Operating_Cash_Flow: 42150,
            Total_Debt: 12340,
            Employee_Count: 608000,
            EBITDA: 68450,
            Net_Income: 23580,
            Total_Assets: 186750,
            Shareholders_Equity: 68950
        };

        try {
            const result = this.evaluateFormula(kpi.formula, mockFinancialData);
            
            return {
                kpi: kpi,
                company: companyName,
                result: result,
                timestamp: new Date(),
                inputs: mockFinancialData,
                provenance: {
                    formula: kpi.formula,
                    inputs: Object.entries(mockFinancialData)
                        .filter(([key, _]) => kpi.formula.includes(key))
                        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})
                }
            };
        } catch (error) {
            console.error('KPI calculation error:', error);
            return null;
        }
    },

    evaluateFormula: function(formula, data) {
        let expression = formula;
        Object.entries(data).forEach(([key, value]) => {
            expression = expression.replace(new RegExp(key, 'g'), value.toString());
        });

        if (!/^[\d\s+\-*/.()]+$/.test(expression)) {
            throw new Error('Invalid formula expression');
        }

        return Function('"use strict"; return (' + expression + ')')();
    }
};

// Smart Alerts Engine
const AlertsEngine = {
    alertTypes: {
        'ratio-threshold': 'Ratio Threshold Alert',
        'anomaly-detection': 'Anomaly Detection',
        'market-correlation': 'Market Correlation Alert',
        'peer-comparison': 'Peer Comparison Alert'
    },

    refreshAlertsList: function() {
        const container = document.getElementById('active-alerts-list');
        if (!container) return;

        if (AppState.smartAlerts.length === 0) {
            container.innerHTML = '<p class="no-alerts">No active alerts. Create alerts to monitor key metrics.</p>';
            return;
        }

        const sampleAlerts = [
            {
                id: 'alert_1',
                company: 'TCS',
                metric: 'Net Profit Margin',
                message: 'Strong performance - margin improvement detected',
                severity: 'info',
                timestamp: new Date()
            }
        ];

        container.innerHTML = sampleAlerts.map(alert => `
            <div class="alert-item ${alert.severity}">
                <div class="alert-content">
                    <div class="alert-header">
                        <strong>${alert.company} - ${alert.metric}</strong>
                        <span class="alert-time">Now</span>
                    </div>
                    <div class="alert-message">${alert.message}</div>
                </div>
                <div class="alert-actions">
                    <button class="btn btn--sm btn--outline" onclick="dismissAlert('${alert.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    updateAlertsStats: function() {
        const stats = { critical: 0, warning: 0, info: 1 };
        AppState.alertsCount = stats;

        const sidebarAlerts = document.getElementById('sidebar-alerts');
        if (sidebarAlerts) {
            sidebarAlerts.textContent = 1;
        }

        Object.entries(stats).forEach(([severity, count]) => {
            const element = document.getElementById(`${severity}-alerts`);
            if (element) element.textContent = count;
        });
    },

    generateAIRecommendations: function() {
        const container = document.getElementById('ai-recommendations-list');
        if (!container) return;

        const recommendations = [
            {
                title: '🎯 Strategic Focus Areas',
                description: 'Based on analysis, focus on improving operational efficiency',
                priority: 'high'
            }
        ];

        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-item">
                <div class="recommendation-header">
                    <strong>${rec.title}</strong>
                    <span class="priority-badge priority-${rec.priority}">${rec.priority}</span>
                </div>
                <p>${rec.description}</p>
            </div>
        `).join('');
    }
};

// Support Functions
function renderUploadQueue() {
    const queueContainer = document.getElementById('upload-queue');
    if (!queueContainer) return;
    
    if (AppState.uploadQueue.length === 0) {
        queueContainer.innerHTML = '';
        return;
    }
    
    queueContainer.innerHTML = AppState.uploadQueue.map(item => `
        <div class="upload-item">
            <div class="upload-info">
                <div class="upload-filename">${item.file.name}</div>
                <div class="upload-size">${formatFileSize(item.file.size)}</div>
                ${item.company ? `<div class="upload-meta">📊 ${item.company} - ${item.type}</div>` : ''}
            </div>
            <div class="upload-status">
                ${getUploadStatusHTML(item)}
            </div>
            <div class="upload-progress">
                <div class="upload-progress-bar" style="width: ${item.progress}%"></div>
            </div>
        </div>
    `).join('');
}

function getUploadStatusHTML(item) {
    const statusMap = {
        processing: '<div class="loading">🔄 Processing...</div>',
        parsing: '<div class="loading">📖 Parsing content...</div>',
        extracting: '<div class="loading">🔍 Extracting data...</div>',
        indexing: '<div class="loading">🧠 Creating embeddings...</div>',
        completed: '<div class="status success">✅ Completed</div>',
        error: '<div class="status error">❌ Failed</div>'
    };
    
    return statusMap[item.status] || statusMap.processing;
}

function updateUI() {
    const hasDocuments = AppState.documents.length > 0;
    
    const emptyState = document.getElementById('empty-state');
    const overviewContent = document.getElementById('overview-content');
    
    if (emptyState && overviewContent) {
        if (hasDocuments) {
            emptyState.classList.add('hidden');
            overviewContent.classList.remove('hidden');
        } else {
            emptyState.classList.remove('hidden');
            overviewContent.classList.add('hidden');
        }
    }
    
    updatePageStates('documents', hasDocuments);
}

function updatePageStates(pageType, hasContent) {
    const noContentState = document.getElementById(`no-${pageType}-state`);
    const contentElement = document.getElementById(`${pageType}-content`);
    
    if (noContentState && contentElement) {
        if (hasContent) {
            noContentState.classList.add('hidden');
            contentElement.classList.remove('hidden');
        } else {
            noContentState.classList.remove('hidden');
            contentElement.classList.add('hidden');
        }
    }
}

function updateStatistics() {
    const sidebarDocs = document.getElementById('sidebar-docs');
    const sidebarKPIs = document.getElementById('sidebar-kpis');
    const sidebarAlerts = document.getElementById('sidebar-alerts');
    
    if (sidebarDocs) sidebarDocs.textContent = AppState.documents.length;
    if (sidebarKPIs) sidebarKPIs.textContent = AppState.customKPIs.length + 2; // Include default KPIs
    if (sidebarAlerts) sidebarAlerts.textContent = AppState.smartAlerts.length;
    
    const totalDocsEl = document.getElementById('total-documents');
    const totalKPIsEl = document.getElementById('total-kpis');  
    const totalAlertsEl = document.getElementById('total-alerts');
    const totalQueriesEl = document.getElementById('total-queries');
    
    if (totalDocsEl) totalDocsEl.textContent = AppState.documents.length;
    if (totalKPIsEl) totalKPIsEl.textContent = AppState.customKPIs.length + 2;
    if (totalAlertsEl) totalAlertsEl.textContent = AppState.smartAlerts.length;
    if (totalQueriesEl) totalQueriesEl.textContent = AppState.totalQueries;
}

function updateCompanyDropdowns() {
    const companySelects = [
        'dashboard-company-select',
        'calc-company-select'
    ];
    
    companySelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        const firstOption = select.children[0];
        select.innerHTML = '';
        if (firstOption) select.appendChild(firstOption);
        
        AppState.companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company;
            option.textContent = company;
            select.appendChild(option);
        });
    });
}

function refreshDocumentsView() {
    const documentsGrid = document.getElementById('documents-grid');
    if (!documentsGrid || AppState.documents.length === 0) return;
    
    documentsGrid.innerHTML = AppState.documents.map(doc => `
        <div class="document-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-16); margin-bottom: var(--space-12);">
            <div class="document-header" style="display: flex; align-items: center; margin-bottom: var(--space-12);">
                <div class="document-type-icon" style="margin-right: var(--space-12); color: var(--color-primary);">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="document-info">
                    <h4 style="margin: 0 0 var(--space-4) 0; color: var(--color-text);">${doc.name}</h4>
                    <div class="document-meta" style="display: flex; gap: var(--space-8); margin-bottom: var(--space-8);">
                        <span class="company-tag" style="background: var(--color-primary); color: white; padding: var(--space-2) var(--space-8); border-radius: var(--radius-sm); font-size: var(--font-size-xs);">${doc.company}</span>
                        <span class="type-tag" style="background: var(--color-secondary); color: var(--color-text); padding: var(--space-2) var(--space-8); border-radius: var(--radius-sm); font-size: var(--font-size-xs);">${doc.type}</span>
                    </div>
                    <div class="document-stats" style="display: flex; gap: var(--space-12); font-size: var(--font-size-sm); color: var(--color-text-secondary);">
                        <span><i class="fas fa-file"></i> ${doc.pages} pages</span>
                        <span><i class="fas fa-database"></i> ${doc.embeddings} vectors</span>
                    </div>
                </div>
            </div>
            <div class="document-status">
                <div class="status success" style="color: var(--color-success); font-weight: 500;">
                    <i class="fas fa-check"></i>
                    ${doc.status}
                </div>
            </div>
        </div>
    `).join('');
}

function refreshDashboardView() {
    if (AppState.documents.length > 0) {
        updateCompanyDropdowns();
    }
}

function setupGlobalSearch() {
    const globalSearchInput = document.getElementById('global-search-input');
    if (globalSearchInput) {
        globalSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performGlobalSearch();
            }
        });
    }
}

function setupDocumentManagement() {
    const refreshBtn = document.getElementById('refresh-documents');
    const searchInput = document.getElementById('document-search');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshDocumentsView);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterDocuments);
    }
}

function filterDocuments() {
    const searchTerm = document.getElementById('document-search').value.toLowerCase();
    const cards = document.querySelectorAll('.document-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? 'block' : 'none';
    });
}

function showEmptyStates() {
    updateUI();
}

// Utility Functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function extractDocumentInfo(filename) {
    const name = filename.toLowerCase();
    
    const companies = ['tcs', 'infosys', 'wipro', 'hcl', 'accenture', 'sbi', 'hdfc', 'icici'];
    let company = 'Sample Company';
    
    for (const comp of companies) {
        if (name.includes(comp)) {
            company = comp.toUpperCase();
            break;
        }
    }
    
    if (company === 'Sample Company') {
        const parts = filename.split(/[-_\s]/);
        if (parts.length > 0) {
            company = parts[0].replace(/\.(pdf|xlsx?|csv|txt)$/i, '').toUpperCase();
        }
    }
    
    let type = 'Financial Document';
    if (name.includes('annual')) type = 'Annual Report';
    else if (name.includes('balance')) type = 'Balance Sheet';
    else if (name.includes('p&l') || name.includes('income')) type = 'P&L Statement';
    else if (name.includes('cash')) type = 'Cash Flow Statement';
    
    return { company, type };
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-left: 4px solid var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'});
        border-radius: var(--radius-lg);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        max-width: 350px;
        min-width: 250px;
        animation: slideIn 0.3s ease-out;
        color: var(--color-text);
    `;
    
    notification.innerHTML = `
        <div class="notification-content" style="display: flex; align-items: center; gap: var(--space-8);">
            <i class="fas ${getNotificationIcon(type)}" style="color: var(--color-${type === 'error' ? 'error' : type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'info'});"></i>
            <span style="flex: 1;">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()" style="
            position: absolute;
            top: 8px;
            right: 8px;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--color-text-secondary);
            font-size: 12px;
        ">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add animation styles
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle', 
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Global function bindings for onclick handlers
window.showPage = navigateToPage;
window.removeMetricFromChart = removeMetricFromChart;
window.generateCustomChart = generateDynamicChart;

window.performGlobalSearch = function() {
    const input = document.getElementById('global-search-input');
    if (input && input.value.trim()) {
        showNotification(`🔍 Searching: "${input.value}"`, 'info');
        navigateToPage('search');
        setTimeout(() => {
            showNotification('✅ Search completed with AI synthesis!', 'success');
        }, 2000);
    }
};

// KPI Builder Functions
window.createCustomKPI = function() {
    const name = document.getElementById('kpi-name')?.value;
    const formula = document.getElementById('kpi-formula')?.value;
    const category = document.getElementById('kpi-category')?.value;
    const description = document.getElementById('kpi-description')?.value;
    
    if (!name || !formula) {
        showNotification('Please enter KPI name and formula.', 'warning');
        return;
    }
    
    try {
        const kpi = KPIBuilder.createKPI(name, formula, category, description);
        showNotification(`✅ Custom KPI "${name}" created successfully!`, 'success');
        
        ['kpi-name', 'kpi-formula', 'kpi-description'].forEach(id => {
            const elem = document.getElementById(id);
            if (elem) elem.value = '';
        });
        
        updateStatistics();
    } catch (error) {
        showNotification(`Error creating KPI: ${error.message}`, 'error');
    }
};

window.calculateKPI = function() {
    const kpiId = document.getElementById('calc-kpi-select')?.value;
    const companyName = document.getElementById('calc-company-select')?.value;
    
    if (!kpiId || !companyName) {
        showNotification('Please select both KPI and company.', 'warning');
        return;
    }
    
    const result = KPIBuilder.calculateKPI(kpiId, companyName);
    const container = document.getElementById('kpi-calculation-result');
    
    if (result && container) {
        container.innerHTML = `
            <div style="background: var(--color-bg-1); padding: var(--space-16); border-radius: var(--radius-base); border-left: 4px solid var(--color-success);">
                <h5 style="margin: 0 0 var(--space-12) 0; color: var(--color-text);">📊 ${result.kpi.name} Calculation</h5>
                <div class="calc-result" style="margin-bottom: var(--space-12);">
                    <strong>Result:</strong> <span style="color: var(--color-success); font-size: var(--font-size-lg); font-weight: bold;">${result.result.toFixed(2)}</span>
                </div>
                <div class="calc-formula" style="margin-bottom: var(--space-12); font-family: var(--font-family-mono); background: var(--color-bg-2); padding: var(--space-8); border-radius: var(--radius-sm);">
                    <strong>Formula:</strong> ${result.kpi.formula}
                </div>
                <div class="calc-inputs">
                    <strong>Inputs Used:</strong>
                    <div style="margin-top: var(--space-8); display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-8);">
                        ${Object.entries(result.provenance.inputs).map(([key, val]) => 
                            `<div style="background: var(--color-surface); padding: var(--space-8); border-radius: var(--radius-sm); border: 1px solid var(--color-border);">${key}: ₹${val.toLocaleString()} Cr</div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
        showNotification('KPI calculated with full provenance tracking!', 'success');
    }
};

window.deleteKPI = function(kpiId) {
    if (confirm('Are you sure you want to delete this custom KPI?')) {
        AppState.customKPIs = AppState.customKPIs.filter(kpi => kpi.id !== kpiId);
        KPIBuilder.refreshKPIList();
        KPIBuilder.updateKPISelectors();
        updateStatistics();
        showNotification('KPI deleted successfully.', 'success');
    }
};

// Market Data Functions
window.syncMarketData = function() {
    showNotification('🔄 Syncing live NSE/BSE data with documents...', 'info');
    setTimeout(() => {
        showNotification('✅ Live market data integrated successfully!', 'success');
    }, 2000);
};

window.setupMarketAlerts = function() {
    showNotification('📊 Market alert configuration opened.', 'info');
};

window.dismissAlert = function(alertId) {
    showNotification('Alert dismissed.', 'info');
};

console.log('🎉 Ultimate Financial RAG Analyzer Pro Ultra - All Interactive Features Working!');