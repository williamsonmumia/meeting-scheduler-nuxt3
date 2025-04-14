<template>
    <div class="card">
        <h2 class="text-2xl font-sans mt-6 mb-2">Meeting Distribution by Time of Day</h2>
        <p class="text-sm text-gray-600 mb-4">
            Track meeting patterns throughout the year to identify optimal scheduling periods and workload distribution.
        </p>
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
        <div class="font-sans mt-4">
            <p class="text-xl">Insights:</p>
            <p>Morning meetings peak in March while afternoon meetings reach their highest in July. 
               Consider scheduling important meetings during lower-volume periods.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
        
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Morning Meetings',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-green-500'),
                backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                yAxisID: 'y',
                tension: 0.4,
                data: [65, 59, 80, 81, 56, 55, 10]
            },
            {
                label: 'Afternoon Meetings',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                backgroundColor: documentStyle.getPropertyValue('--p-gray-500'),
                yAxisID: 'y1',
                tension: 0.4,
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ' + context.parsed.y + ' meetings';
                    },
                    footer: function(tooltipItems) {
                        const item = tooltipItems[0];
                        const month = item.label;
                        const morning = tooltipItems.find(i => i.datasetIndex === 0)?.parsed.y || 0;
                        const afternoon = tooltipItems.find(i => i.datasetIndex === 1)?.parsed.y || 0;
                        return 'Total for ' + month + ': ' + (morning + afternoon) + ' meetings';
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    color: textColor
                },
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Number of Meetings',
                    color: textColor
                },
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Number of Meetings',
                    color: textColor
                },
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    drawOnChartArea: false,
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>