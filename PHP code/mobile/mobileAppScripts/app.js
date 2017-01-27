requirejs(["mobileAppScripts/accelerometerMonitor"], function(AccelerometerMonitorModule) {
    let a = new AccelerometerMonitorModule();
    a.onAccelerationChanged = (accelerationInfo) => {

        var jsonResult = JSON.stringify(accelerationInfo);

        // console.log(jsonResult);

        // $.post("accelerometer_request.php", function(jsonResult) {
        //     console.log(jsonResult);
        // });

        $.ajax({
            type: 'POST',
            url: '../api/accelerometer_request.php',
            data: jsonResult, // or JSON.stringify ({name: 'jonas'}),
            success: function(data) {
                // console.log('Posted: ' + data);
            },
            contentType: "application/json"
        });

        // $.ajax({
        //     type: 'GET',
        //     url: '../api/accelerometer_request.php',
        //     data: jsonResult, // or JSON.stringify ({name: 'jonas'}),
        //     success: function(data) {
        //         console.log('Got back: ' + data);
        //     },
        //     contentType: "application/json"
        // });

    }
});
