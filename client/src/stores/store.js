import { reactive } from 'vue'

export const filters = reactive({
    popularity:{
        min:0,
        max:100
    },
    energy:{
        min:0,
        max:100
    },
    tempo:{
        min:0,
        max:100
    },
    vocals:{
        min:0,
        max:100
    },

    setPopularity(min, max){
        this.popularity.min = min;
        this.popularity.max = max;
    },
    setEnergy(min, max){
        this.energy.min = min;
        this.energy.max = max;
    },
    setTempo(min, max){
        this.tempo.min = min;
        this.tempo.max = max;
    },
    setVocals(min, max){
        this.vocals.min = min;
        this.vocals.max = max;
    },
})

export const selected = reactive({
    artists: [],
    tracks: [],
    setArtists(a){
        this.artists = a
    },
    setTracks(a){
        this.tracks = a
    },
})