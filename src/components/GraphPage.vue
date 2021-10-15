<template>
  <body class="bg-black-alt font-sans leading-normal tracking-normal">
    <div
      class="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0"
    >
      <div class="w-full md:w-1/2 p-3">
        <!--Graph Card-->
        <div class="bg-gray-900 border border-gray-800 rounded shadow">
          <div class="border-b border-gray-800 p-3">
            <h5 class="font-bold uppercase text-gray-600">Focus Level</h5>
          </div>
          <div class="p-5">
            <apexchart
              width="500"
              height="350"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/2 p-3">
        <!--Metric Card-->
        <div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
            <div v-if="counter > 0.5">
              <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-span-3 rounded p-3 bg-green-400"></div>
                <div class="col-span-2 font-bold uppercase text-gray-400">In the zone! </div>
                <div class="row-span-2 col-span-2 ... text-white">Alpha/Theta ratio is: {{counter}}</div>
              </div>
            </div>
            <div v-else>
              <div class="grid grid-rows-3 grid-flow-col gap-4">
                <div class="row-span-3 rounded p-3 bg-red-400"></div>
                <div class="col-span-2 font-bold uppercase text-gray-400">Not quite!</div>
                <div class="row-span-2 col-span-2 ... text-white">Alpha/Theta ratio is: {{counter}}</div>
              </div>
              <!-- <div class="flex-1 pr-4">
                <div class="rounded p-3 bg-red-600">
                </div>
              </div>
              <div class="flex-1 text-right md:text-center">
                <h5 class="font-bold uppercase text-gray-400">
                  Not in focus, keep trying!
                </h5>
              </div> -->
            </div>
                      <button v-on:click="sendMessage('start')" class="bg-transparent hover:bg-grey-500 text-white font-semibold hover:text-white py-2 px-4 border border-grey-500 hover:border-transparent rounded">
                      <div v-if="active">
                      
                      Stop
                      </div>
                      <div v-else>
                        Start Focus Exercise
                      </div>
  
</button>
          </div>

        </div>
      
            <!--/Metric Card-->
    </div>
    <!--/Graph Card-->    
  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";

const counter = ref(0);
const connection = ref(null);
const eegData = ref([]);
const active = ref(false);

console.log(counter.value);

// const props = defineProps({
//   type: String,
// });

// const init = async () => {
//   console.log(props.type);
//   props.type = 'line';
// }

// init();

const getEEGData = () => {
  console.log("Starting connection to WebSocket Server");

  connection.value = new WebSocket("ws://eeg-image-nteepy55bq-uc.a.run.app");

  connection.value.onopen = function(event) {
    console.log(event);
    console.log("Successfully connected to the echo websocket server...");
  };
};

const buildEegChart = () => {
  getEEGData();
};

onMounted(buildEegChart);

const sendMessage = (msg) => {

  if(active.value) {
    connection.value.close();
    active.value = false;
  } else {

    

  connection.value.send(msg);

  connection.value.onmessage = function(event) {
    console.log("message received!");
    console.log(eegData.value);

    // build array
    if (eegData.value.length < 10) {
      eegData.value.push(Math.round(event.data * 100) / 100);
    }

    // keep it inside 10 values
    if (eegData.value.length == 10) {
      eegData.value.shift();

      eegData.value.push(Math.round(event.data * 100) / 100);
    }
    counter.value = Math.round(event.data * 100) / 100;
  };
  active.value = true;
  }
};

const series = [
  {
    name: "series-1",
    data: eegData.value,
  },
];

const chartOptions = {
  chart: {
    height: 800,
    width: 800,
    type: "line",
  },

  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "solid",
      shadeIntensity: 0.25,
      gradientToColors: undefined,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [50, 0, 100, 100],
    },
  },
  xaxis: {
    categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  yaxis: {
    min: 0,
    max: 2,
    forceNiceScale: true,
  },
  title: {
    text: "Focus Level",
    align: "center",
    style: {
      fontSize: "15px",
    },
  },
  legend: {
    position: "top",
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
