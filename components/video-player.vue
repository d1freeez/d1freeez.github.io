<template>
  <div>
    <div class="player-view">
      <section class="container" v-if="url">
        <!--      <h3 class="_title">Data, Data Everywhere!</h3>-->
        <div class="video-player-box" :playsinline="playsinline" @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @ready="playerReadied"
          @statechanged="playerStateChanged($event)" v-video-player:myVideoPlayer='{
        muted: false,
        language: "ru",
        sources: [{
          type: "application/x-mpegURL",
          src: this.url || ""
      }],
      }'>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['url', 'id'],
    data() {
      return {
        playsinline: true,
        time: 0,
        finished: false,
      }
    },

    mounted() {
      let _element = document.querySelector('.body')
      // if (_element) _element.addEventListener('click', () => {
        // document.activeElement.blur();
        // let _btn = document.querySelector('.vjs-play-control')
        // _btn.focus();
      // })
    },

    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        if (player.duration() === player.currentTime()) {
          this.$store.dispatch('course_test/finishedSeries', this.id).then(response => {
            // this.$router.go(-1)
            // this.next = true;
          })
        }
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
        // console.log('example 01: the player is readied', player)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .player-view {
    ._title {
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      color: #0B132A;
      margin-bottom: 30px;
      margin-top: 30px;
    }
  }

  .video-player-box {
    max-width: 900px;
    width: 100%;
    height: 500px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    background: #000000;

    .video-js {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 1400px) {
    .container {
      padding: 0;
    }
  }

  @media screen and (max-width: 550px) {
    .player-view {
      margin-top: 30px;

      .container {
        padding: 0;
      }
    }

    .video-player-box {
      min-height: 250px;
      height: 250px;
      display: block;
    }
  }
</style>
