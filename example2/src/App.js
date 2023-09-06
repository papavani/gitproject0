import React from 'react';

const myArray = ['pavani', 'bujji', 'venu'];
const myArray2 = ['pavani', 'venu', 'bhumi','bujji'];
const result = [...myArray, ...myArray2];  // combine two arrays

 const uniqueResult = Array.from(new Set(result)); // Remove duplicates
const mainResult=uniqueResult.map((item) => <p>{item}</p>) // to get output in line my line by using .map() method.
function App() {
  return (
    <div>
      {/* case 1 */}
      {/* [{uniqueResult.join(', ')}]   */}
      {/* case 2 */}
      {mainResult}
    </div>
  );
}

export default App;
