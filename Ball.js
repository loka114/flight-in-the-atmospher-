class Ball {



    dt = 0.01;
    g = 9.81;

    a;
    v0;
    y0;
    t;
    x1;
    y1;

    maximumHeight;
    maximumWidth;
    totalTime;

    timeout;

    clicked = false;

    start(chart) {

        if (this.clicked === true) {
            this.timeout = setInterval(() => this.addData(chart), 100);
            this.clicked = false;
        } else {

            this.removeData(chart);
            this.a = parseFloat(document.getElementById("angleText").value); //angle
            this.v0 = parseFloat(document.getElementById("speedText").value); //speed
            this.y0 = parseFloat(document.getElementById("heightText").value); //height


            this.maximumHeight = (Math.sin(this.a * Math.PI / 180.0) * this.v0 * Math.sin(this.a * Math.PI / 180.0) * this.v0) / (2.0 * this.g) + this.y0;
            this.totalTime = (Math.sin(this.a * Math.PI / 180.0) * this.v0 + Math.sqrt(Math.sin(this.a * Math.PI / 180.0) * this.v0 * Math.sin(this.a * Math.PI / 180.0) * this.v0 + 2.0 * this.g * (this.maximumHeight))) / this.g;
            this.maximumWidth = this.totalTime * Math.cos(this.a * Math.PI / 180.0) * this.v0;

            this.t = 0;
            this.x1 = 0;
            this.y1 = this.y0;

            window.myLine.options.scales.xAxes[0].ticks.max = this.maximumWidth;
            window.myLine.options.scales.yAxes[0].ticks.max = this.maximumHeight;
            this.timeout = setInterval(() => this.addData(myLine), 150);
        }

    }

    removeData(chart) {  // FUNCTION OF REMOVING THE OLD DATA FROM THE CHART SO WE CAN DRAW A NEW ONE
        config.data.labels.length = 0;
        config.data.datasets.forEach((dataset) => {
            dataset.data.length = 0;
        });
        clearInterval(this.timeout);
        chart.update();

    };

    addData(chart) {

        this.t = this.t + this.dt;  // TIME
        this.x1 = this.v0 * Math.cos(this.a * Math.PI / 180.0) * this.t; // X coordinate <<width>>
        this.y1 = this.y0 + this.v0 * Math.sin(this.a * Math.PI / 180.0) * this.t - this.g * this.t * this.t / 2.0; // Y coordinate <<height>>


        document.getElementById("timeText").value = this.t;

        this.pushData(chart, this.x1, this.y1);


        chart.update();
        if (this.y1 <= 0) {  // WHEN THE Y1 BECOME LESS THAN OR EQUAL ZERO WE CLEAR THE INTERVAL AND STOP.
            clearInterval(this.timeout);
        }
    }

    pushData(chart, x1, y1) {
        chart.data.datasets[0].data.push({x: x1, y: y1});
    }

    pause() {
        if (this.clicked === false) {
            clearInterval(this.timeout);
            this.clicked = true;
        }
    }

}