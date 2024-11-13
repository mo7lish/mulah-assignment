<template>
    <v-app>
        <div id="app">
            <h1>Mulah Assignment</h1>
            <h3>Alshamrani Mohammed</h3>

            <div class="table-container">
                <h2>Table 1</h2>
                <v-data-table :headers="table1Headers" :items="table1" class="elevation-1"></v-data-table>
            </div>

            <div class="table-container">
                <h2>Table 2</h2>
                <v-data-table :headers="table2Headers" :items="table2Items" class="elevation-1"></v-data-table>
            </div>
        </div>
    </v-app>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default {
    vuetify: new Vuetify(),
    data() {
        return {
            table1: [],
            table2: {
                Alpha: 0,
                Beta: 0,
                Charlie: 0
            },
            table1Headers: [
                { text: 'Index #', value: 'Index #' },
                { text: 'Value', value: 'Value' }
            ],
            table2Headers: [
                { text: 'Category', value: 'Category' },
                { text: 'Value', value: 'Value' }
            ]
        };
    },
    computed: {
        table2Items() {
            return [
                { Category: 'Alpha', Value: this.table2.Alpha },
                { Category: 'Beta', Value: this.table2.Beta },
                { Category: 'Charlie', Value: this.table2.Charlie }
            ];
        }
    },
    mounted() {
        axios.get('http://localhost:3000/table1')
            .then(response => {
                this.table1 = response.data;
                console.log("Table 1 Data:", this.table1);
                this.calculateTable2();
            })
            .catch(error => {
                console.error("Error fetching Table 1 data:", error.response ? error.response.data : error.message);
            });
    },
    methods: {
        calculateTable2() {
            let alphaSum = 0;
            let betaSum = 0;
            let charlieSum = 0;

            const a5Row = this.table1.find(row => row['Index #'] === 'A5');
            const a20Row = this.table1.find(row => row['Index #'] === 'A20');
            const a15Row = this.table1.find(row => row['Index #'] === 'A15');
            const a7Row = this.table1.find(row => row['Index #'] === 'A7');
            const a13Row = this.table1.find(row => row['Index #'] === 'A13');
            const a12Row = this.table1.find(row => row['Index #'] === 'A12');

            const a5Value = a5Row ? parseInt(a5Row.Value, 10) : 0;
            const a20Value = a20Row ? parseInt(a20Row.Value, 10) : 0;
            const a15Value = a15Row ? parseInt(a15Row.Value, 10) : 0;
            const a7Value = a7Row ? parseInt(a7Row.Value, 10) : 0;
            const a13Value = a13Row ? parseInt(a13Row.Value, 10) : 0;
            const a12Value = a12Row ? parseInt(a12Row.Value, 10) : 0;

            alphaSum = a5Value + a20Value;
            betaSum = a7Value !== 0 ? Math.floor(a15Value / a7Value) : 0;
            charlieSum = a13Value * a12Value;

            this.table2.Alpha = alphaSum;
            this.table2.Beta = betaSum;
            this.table2.Charlie = charlieSum;
        }
    }
};
</script>

<style>
.table-container {
    width: 50%;
    margin: 20px auto;
}

h2 {
    text-align: center;
}
</style>