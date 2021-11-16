export default class Audio {

  static initialized = false
  static enabled = true

  static audios = {}

  static init() {
    if(this.initialized){
      return
    }
    let WebAudioContext = window.AudioContext || window.webkitAudioContext;

    this.context = new WebAudioContext();
    // 调整播放音量
    this.gainNode = this.context.createGain();
    // 默认为 1/2 的音量
    this.gainNode.gain.setValueAtTime(0.5, this.context.currentTime);
    this.gainNode.connect(this.context.destination);

    this.unlock()

    this.initialized = true
  }

  static unlock () {
    const unlockWebAudio =  () => {
      if (this.context.state !== "running") {
        this.context.resume();
      }
      document.body.removeEventListener("click", unlockWebAudio, true);
    };

    // unlock webaudio autoplay policy
    document.body.addEventListener("click", unlockWebAudio, true);
  }

  static loadEffects (map) {
    map.forEach((value, key) => {
      this.loadEffect(key, value)
    })
  }

  static async loadEffect (key, path){
    const effectRes = await fetch(path);
    const effectBuffer = await effectRes.arrayBuffer();

    this.context.decodeAudioData(effectBuffer, data => {
      this.audios[key] = data;
    }, e => {
      // reject(e);
    });
  }

  /**
   *  设置声音可用
   */
  static enable () {
    this.enabled = true
  }

  static disable(){
    this.enabled = false
  }

  /**
   *  播放声音
   * @param {String} name 文件名称
   * @param {Number} currentTime 播放起始位置
   */
  static play (name) {
    if (this.enabled && this.audios[name]) {
      this.playEffect(this.audios[name]);
    }
  }

  static playEffect (buffer) {
    const sourceNode = this.context.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.loop = false;
    sourceNode.connect(this.gainNode);

    sourceNode.start(0);
    sourceNode.onended = function() {
      sourceNode.buffer = null;
      sourceNode.disconnect();
    };
  }
}