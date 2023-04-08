import { createState, Component } from 'solid-js';
import { TileComponentProps } from 'bachelorproef-app-shell';

export const Tile: Component<TileComponentProps> = () => {
  const [state, setState] = createState({ count: 0 });

  return (
    <div class="tile">
      <h3>Solid {state.count}</h3>
      <button onClick={() => setState({ count: state.count + 1 })}>+</button>
      <button onClick={() => setState({ count: state.count - 1 })}>-</button>
    </div>
  );
};
