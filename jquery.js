        // Slice a fruit
        // play sound
        // explode fruit

        var playing = false; // set playing to false as we are not playing until we click start
        var score;
        var trialsleft;
        var fruits = ['apple', 'banana', 'blackberry', 'grape',
            'pear', 'pineapple', 'watermelon'
        ];
        var step;
        var action;

        $(function () {
            $("#startreset").click(function () { // Click start/reset button
                // are we playing?
                if (playing == true) { // yes

                    location.reload(); // reload page

                } else { // no

                    playing = true; // game has started
                    score = 0;
                    $("#scorevalue").html(score);
                    $("#trialsleft").show(); // show trials left
                    trialsleft = 3;
                    addHearts();

                    //hide game over box
                    $("#gameover").hide();

                    $("#startreset").html("Reset Game"); // change button text to reset

                    startAction(); // start sending fruits
                }
            });

            $("#fruit1").mouseover(function(){
                score++;
                $("#scorevalue").html(score);
                document.getElementById("slicesound").play(); // play sound

                // stop fruit going down and hide it
                clearInterval(action);
                $("#fruit1").hide("explode", 500);

                // send new fruit and wait 500ms
                // without the timeout, it would instantly send the fruit
                setTimeout(startAction, 600);
            });

            function addHearts() {
                $("#trialsleft").empty();
                for (i = 0; i < trialsleft; i++) {
                    $("#trialsleft").append('<img src="img/heart.png" class="life">');
                }
            }

            function startAction() {
                // generate fruit
                $("#fruit1").show();
                chooseFruit();
                $("#fruit1").css({
                    'left': Math.round(550 * Math.random()),
                    'top': -50
                });

                // generate random step
                step = 1 + Math.round(5 * Math.random()); // change step

                // move fruit down by 1 step every 10ms
                action = setInterval(function () {
                    $("#fruit1").css('top', $("#fruit1").position().top + step);
                    // check if the fruit is too low
                    if ($("#fruit1").position().top + step > $("#fruitcontainer").height()) {

                        // check if we have any trails left
                        if (trialsleft > 1) {
                            // generate fruit
                            $("#fruit1").show();
                            chooseFruit();
                            $("#fruit1").css({
                                'left': Math.round(550 * Math.random()),
                                'top': -50
                            });

                            // generate random step
                            step = 1 + Math.round(5 * Math.random()); // change step

                            // reduce trails by 1
                            trialsleft--;

                            addHearts();
                        } else { // game over
                            playing = false;
                            $("#startreset").html("Start Game");
                            $("#gameover").show();
                            $("#gameover").html('<p>Game Over!</p><p>Your score is ' + score + '.</p>');
                            $("#trialsleft").hide();
                            stopAction();
                        }

                    }
                }, 10);
            }

            // generate random fruit
            function chooseFruit() {
                $("#fruit1").attr('src', 'img/' + fruits[Math.round(6 * Math.random())] + '.png');
            }

            // stop dropping fruits
            function stopAction() {
                clearInterval(action);
                $("#fruit1").hide();
            }

        });
