export const changeSampleName = ({ commit }) => {
    const array = [ 'hoge', 'moge', 'foo', 'bar' ];
    commit('setSampleName', {
        name: array[Math.floor(Math.random() * array.length)]
    });
};










