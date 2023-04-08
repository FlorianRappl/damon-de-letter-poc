import { Component, createSignal } from 'solid-js';

const Page: Component = () => {
  const [getCount, setCount] = createSignal(0);

  return (
    <div class="tile">
      <h3>Solid {getCount()}</h3>
      <button onClick={() => setCount(getCount() + 1)}>+</button>
      <button onClick={() => setCount(getCount() - 1)}>-</button>
    </div>
  );
};

export default Page;
