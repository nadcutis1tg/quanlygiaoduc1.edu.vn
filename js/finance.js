// Finance Management Module
const Finance = {
    selectedYear: 2024,
    chartInstance: null,

    render() {
        const contentArea = document.getElementById('content-area');
        const finances = Database.getFinancesByYear(this.selectedYear);
        
        // Tính tổng
        const totalIncome = finances.reduce((sum, f) => sum + f.income.total, 0);
        const totalExpense = finances.reduce((sum, f) => sum + f.expense.total, 0);
        const totalProfit = totalIncome - totalExpense;

        contentArea.innerHTML = `
            <div class="finance-page">
                <div class="page-header">
                    <h1>💰 Quản lý Tài chính</h1>
                    <div class="header-actions">
                        <select onchange="Finance.changeYear(this.value)" class="year-select">
                            <option value="2024" selected>Năm 2024</option>
                            <option value="2023">Năm 2023</option>
                            <option value="2022">Năm 2022</option>
                        </select>
                        <button class="btn btn-secondary" onclick="Finance.exportReport()">
                            <i class="fas fa-download"></i> Xuất báo cáo
                        </button>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="finance-summary">
                    <div class="summary-card income">
                        <div class="summary-icon">
                            <i class="fas fa-arrow-up"></i>
                        </div>
                        <div class="summary-info">
                            <h3>${Utils.formatCurrency(totalIncome)}</h3>
                            <p>Tổng Thu</p>
                        </div>
                    </div>
                    <div class="summary-card expense">
                        <div class="summary-icon">
                            <i class="fas fa-arrow-down"></i>
                        </div>
                        <div class="summary-info">
                            <h3>${Utils.formatCurrency(totalExpense)}</h3>
                            <p>Tổng Chi</p>
                        </div>
                    </div>
                    <div class="summary-card profit ${totalProfit >= 0 ? 'positive' : 'negative'}">
                        <div class="summary-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="summary-info">
                            <h3>${Utils.formatCurrency(totalProfit)}</h3>
                            <p>Lợi nhuận</p>
                        </div>
                    </div>
                </div>

                <!-- Chart -->
                <div class="chart-container">
                    <h3><i class="fas fa-chart-bar"></i> Biểu đồ Thu Chi</h3>
                    <canvas id="financeChart" width="800" height="300"></canvas>
                </div>

                <!-- Monthly Table -->
                <div class="table-container">
                    <h3><i class="fas fa-table"></i> Chi tiết theo tháng</h3>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Tháng</th>
                                <th>Thu - Học phí</th>
                                <th>Thu - Khác</th>
                                <th>Tổng Thu</th>
                                <th>Chi - Lương</th>
                                <th>Chi - Cơ sở</th>
                                <th>Chi - Khác</th>
                                <th>Tổng Chi</th>
                                <th>Lợi nhuận</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${finances.map(f => this.renderFinanceRow(f)).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        // Render chart sau khi DOM đã load
        setTimeout(() => this.renderChart(finances), 100);
    },

    renderFinanceRow(finance) {
        return `
            <tr>
                <td><strong>Tháng ${finance.month}</strong></td>
                <td>${Utils.formatCurrency(finance.income.tuition)}</td>
                <td>${Utils.formatCurrency(finance.income.other)}</td>
                <td class="highlight-income">${Utils.formatCurrency(finance.income.total)}</td>
                <td>${Utils.formatCurrency(finance.expense.salary)}</td>
                <td>${Utils.formatCurrency(finance.expense.facility)}</td>
                <td>${Utils.formatCurrency(finance.expense.other)}</td>
                <td class="highlight-expense">${Utils.formatCurrency(finance.expense.total)}</td>
                <td class="${finance.profit >= 0 ? 'highlight-profit' : 'highlight-loss'}">
                    ${Utils.formatCurrency(finance.profit)}
                </td>
                <td>
                    <button class="btn-icon" onclick="Finance.viewDetail('${finance.id}')" title="Xem chi tiết">
                        <i class="fas fa-eye"></i>
                    </button>
                </td>
            </tr>
        `;
    },

    renderChart(finances) {
        const canvas = document.getElementById('financeChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Destroy previous chart if exists
        if (this.chartInstance) {
            this.chartInstance = null;
        }

        const labels = finances.map(f => `Tháng ${f.month}`);
        const incomeData = finances.map(f => f.income.total / 1000000); // Convert to millions
        const expenseData = finances.map(f => f.expense.total / 1000000);
        const profitData = finances.map(f => f.profit / 1000000);

        // Simple area chart drawing
        const width = canvas.width;
        const height = canvas.height;
        const padding = 50;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Find max value
        const maxValue = Math.max(...incomeData, ...expenseData);
        const scale = chartHeight / maxValue;

        // Draw grid
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (chartHeight / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Calculate points for area charts
        const pointSpacing = chartWidth / (finances.length - 1);
        
        // Draw Income Area (green)
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        finances.forEach((f, i) => {
            const x = padding + pointSpacing * i;
            const y = padding + chartHeight - (incomeData[i] * scale);
            if (i === 0) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.closePath();
        ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.fill();
        
        // Draw Income Line
        ctx.beginPath();
        finances.forEach((f, i) => {
            const x = padding + pointSpacing * i;
            const y = padding + chartHeight - (incomeData[i] * scale);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw points
        finances.forEach((f, i) => {
            const x = padding + pointSpacing * i;
            const y = padding + chartHeight - (incomeData[i] * scale);
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#10B981';
            ctx.fill();
        });

        // Draw Expense Area (red)
        ctx.beginPath();
        ctx.moveTo(padding, padding + chartHeight);
        finances.forEach((f, i) => {
            const x = padding + pointSpacing * i;
            const y = padding + chartHeight - (expenseData[i] * scale);
            if (i === 0) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.lineTo(padding + chartWidth, padding + chartHeight);
        ctx.closePath();
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fill();
        
        // Draw Expense Line
        ctx.beginPath();
        finances.forEach((f, i) => {
            const x = padding + pointSpacing * i;
            const y = padding + chartHeight - (expenseData[i] * scale);
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.strokeStyle = '#EF4444';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw points
        finances.forEach((f, i) => {
            const x = padding + pointSpacing * i;
            const y = padding + chartHeight - (expenseData[i] * scale);
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#EF4444';
            ctx.fill();
        });

        // Draw labels
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        finances.forEach((f, i) => {
            const x = padding + pointSpacing * i;
            ctx.fillText(`T${f.month}`, x, height - 20);
        });

        // Draw legend
        const legendY = 20;
        ctx.fillStyle = '#10B981';
        ctx.fillRect(width - 200, legendY, 15, 15);
        ctx.fillStyle = '#374151';
        ctx.textAlign = 'left';
        ctx.fillText('Thu nhập', width - 180, legendY + 12);

        ctx.fillStyle = '#EF4444';
        ctx.fillRect(width - 200, legendY + 25, 15, 15);
        ctx.fillStyle = '#374151';
        ctx.fillText('Chi phí', width - 180, legendY + 37);

        // Draw title
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Đơn vị: Triệu VNĐ', padding, 30);
    },

    changeYear(year) {
        this.selectedYear = parseInt(year);
        this.render();
    },

    viewDetail(id) {
        const finance = Database.finances.find(f => f.id === id);
        if (!finance) return;

        const modal = `
            <div class="modal-overlay" onclick="if(event.target === this) Finance.closeModal()">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-file-invoice-dollar"></i> Chi Tiết Tài Chính</h3>
                        <button class="close-btn" onclick="Finance.closeModal()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="finance-detail">
                        <h4>Tháng ${finance.month}/${finance.year}</h4>
                        
                        <div class="detail-section">
                            <h5 class="income-title"><i class="fas fa-arrow-up"></i> Thu nhập</h5>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Học phí:</label>
                                    <span>${Utils.formatCurrency(finance.income.tuition)}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Thu khác:</label>
                                    <span>${Utils.formatCurrency(finance.income.other)}</span>
                                </div>
                                <div class="detail-item total">
                                    <label>Tổng thu:</label>
                                    <span class="highlight-income">${Utils.formatCurrency(finance.income.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div class="detail-section">
                            <h5 class="expense-title"><i class="fas fa-arrow-down"></i> Chi phí</h5>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Lương giảng viên:</label>
                                    <span>${Utils.formatCurrency(finance.expense.salary)}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Cơ sở vật chất:</label>
                                    <span>${Utils.formatCurrency(finance.expense.facility)}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Chi phí khác:</label>
                                    <span>${Utils.formatCurrency(finance.expense.other)}</span>
                                </div>
                                <div class="detail-item total">
                                    <label>Tổng chi:</label>
                                    <span class="highlight-expense">${Utils.formatCurrency(finance.expense.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div class="detail-section">
                            <div class="profit-display ${finance.profit >= 0 ? 'positive' : 'negative'}">
                                <label>Lợi nhuận:</label>
                                <span class="profit-value">${Utils.formatCurrency(finance.profit)}</span>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button class="btn btn-secondary" onclick="Finance.closeModal()">
                                <i class="fas fa-times"></i> Đóng
                            </button>
                            <button class="btn btn-primary" onclick="Finance.exportMonthReport('${finance.id}')">
                                <i class="fas fa-download"></i> Xuất báo cáo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modal);
    },

    exportReport() {
        const finances = Database.getFinancesByYear(this.selectedYear);
        
        // Tạo CSV content
        let csvContent = 'Tháng,Thu - Học phí,Thu - Khác,Tổng Thu,Chi - Lương,Chi - Cơ sở,Chi - Khác,Tổng Chi,Lợi nhuận\n';
        
        finances.forEach(f => {
            csvContent += `${f.month},${f.income.tuition},${f.income.other},${f.income.total},${f.expense.salary},${f.expense.facility},${f.expense.other},${f.expense.total},${f.profit}\n`;
        });
        
        // Tạo Blob và download
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `Bao_cao_tai_chinh_${this.selectedYear}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        Utils.showToast('Đã xuất file Excel (CSV)', 'success');
    },

    exportMonthReport(id) {
        const finance = Database.finances.find(f => f.id === id);
        if (!finance) return;
        
        // Tạo HTML content cho PDF
        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Báo cáo Tài chính Tháng ${finance.month}/${finance.year}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #333; text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                    th { background-color: #4CAF50; color: white; }
                    .total { font-weight: bold; background-color: #f2f2f2; }
                    .profit { color: ${finance.profit >= 0 ? 'green' : 'red'}; font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>BÁO CÁO TÀI CHÍNH</h1>
                <h2>Tháng ${finance.month}/${finance.year}</h2>
                
                <h3>THU NHẬP</h3>
                <table>
                    <tr><th>Khoản thu</th><th>Số tiền (VNĐ)</th></tr>
                    <tr><td>Học phí</td><td>${finance.income.tuition.toLocaleString('vi-VN')}</td></tr>
                    <tr><td>Thu khác</td><td>${finance.income.other.toLocaleString('vi-VN')}</td></tr>
                    <tr class="total"><td>Tổng thu</td><td>${finance.income.total.toLocaleString('vi-VN')}</td></tr>
                </table>
                
                <h3>CHI PHÍ</h3>
                <table>
                    <tr><th>Khoản chi</th><th>Số tiền (VNĐ)</th></tr>
                    <tr><td>Lương giảng viên</td><td>${finance.expense.salary.toLocaleString('vi-VN')}</td></tr>
                    <tr><td>Cơ sở vật chất</td><td>${finance.expense.facility.toLocaleString('vi-VN')}</td></tr>
                    <tr><td>Chi phí khác</td><td>${finance.expense.other.toLocaleString('vi-VN')}</td></tr>
                    <tr class="total"><td>Tổng chi</td><td>${finance.expense.total.toLocaleString('vi-VN')}</td></tr>
                </table>
                
                <h3>LỢI NHUẬN</h3>
                <table>
                    <tr class="total"><td>Lợi nhuận</td><td class="profit">${finance.profit.toLocaleString('vi-VN')}</td></tr>
                </table>
            </body>
            </html>
        `;
        
        // Mở cửa sổ mới và in
        const printWindow = window.open('', '_blank');
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Tự động mở dialog in
        setTimeout(() => {
            printWindow.print();
        }, 500);
        
        Utils.showToast('Đang mở báo cáo PDF...', 'info');
    },

    closeModal() {
        document.querySelector('.modal-overlay')?.remove();
    }
};
