define(["mobileAppScripts/accelerationInfo"], function(AccelerationInfo) {

    return class AccelerometerMonitor {

        onAccelerationChanged() {}

        hasChanged(num1, num2) {
            return !(num1.toFixed(0) === num2.toFixed(0));
        }


        hasAccelerationChanged(event) {
            return (
                this.hasChanged(this.accelerationInfo.x, event.accelerationIncludingGravity.x) ||
                this.hasChanged(this.accelerationInfo.y, event.accelerationIncludingGravity.y) ||
                this.hasChanged(this.accelerationInfo.z, event.accelerationIncludingGravity.z));
        }

        constructor() {
            this.accelerationInfo = new AccelerationInfo();

            window.ondevicemotion = (event) => {
                if (this.hasAccelerationChanged(event)) {
                    this.accelerationInfo.x = event.accelerationIncludingGravity.x;
                    this.accelerationInfo.y = event.accelerationIncludingGravity.y;
                    this.accelerationInfo.z = event.accelerationIncludingGravity.z;
                    this.onAccelerationChanged(this.accelerationInfo);
                }
            }
        }
    }

});
//define: declares a module
//["mobileApp/accelerationInfo"] - dependency
//function(AccelerationInfo) - function called when dependency is loaded
