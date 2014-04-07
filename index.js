var FFmpeg = require('fluent-ffmpeg');
var command = FFmpeg({ source: './trimmed.mp4' })
  .withNoAudio()
  //.fromFormat('mp4')
  .toFormat('webm')
  .withVideoCodec('libvpx')
  .on('start', function(commandLine) {
        // The 'start' event is emitted just after the FFmpeg
        // process is spawned.

        console.log('Spawned FFmpeg with command: ' + commandLine);
    })

    .on('codecData', function(data) {
        // The 'codecData' event is emitted when FFmpeg first
        // reports input codec information. 'data' contains
        // the following information:
        // - 'format': input format
        // - 'duration': input duration
        // - 'audio': audio codec
        // - 'audio_details': audio encoding details
        // - 'video': video codec
        // - 'video_details': video encoding details
        console.log('Input is ' + data.audio + ' audio with ' + data.video + ' video');
    })

    .on('progress', function(progress) {
        // The 'progress' event is emitted every time FFmpeg
        // reports progress information. 'progress' contains
        // the following information:
        // - 'frames': the total processed frame count
        // - 'currentFps': the framerate at which FFmpeg is
        //   currently processing
        // - 'currentKbps': the throughput at which FFmpeg is
        //   currently processing
        // - 'targetSize': the current size of the target file
        //   in kilobytes
        // - 'timemark': the timestamp of the current frame
        //   in seconds
        // - 'percent': an estimation of the progress

        console.log('Processing: ' + progress.percent + '% done');
    })

    .on('error', function(err, stdout, stderr) {
        // The 'error' event is emitted when an error occurs,
        // either when preparing the FFmpeg process or while
        // it is running

        console.log('Cannot process video: ' + err.message);
        console.log("ffmpeg stdout:\n" + stdout);
        console.log("ffmpeg stderr:\n" + stderr);
    })

    .on('end', function() {
        // The 'end' event is emitted when FFmpeg finishes
        // processing.

        console.log('Processing finished successfully');
    })
    .saveToFile('output.webm');
