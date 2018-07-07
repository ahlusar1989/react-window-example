import React, { Fragment, PureComponent } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import memoize from 'memoize-one';
import ItemRenderer from './ItemRenderer';
import { rowHeight } from './constants';

export default class App extends PureComponent {
  state = {
    focusedNode: this.props.data.nodes[this.props.data.root],
  };

  // Shared context between the App and individual List item renderers.
  // Memoize this wrapper object to avoid breaking PureComponent's sCU.
  getItemData = memoize((data, focusedNode, focusNode, width) => ({
    data,
    focusedNode,
    focusNode,
    scale: value => value / focusedNode.width * width,
  }));

  render() {
    return (
      <Fragment>
        <p>
          Click a row in the chart below to zoom in or out. Scroll up or down to
          see more of the chart.
        </p>
        <div
          style={{
            height: '15rem',
            backgroundColor: '#fff',
            padding: '1rem',
            boxSizing: 'border-box',
            borderRadius: '0.5rem',
          }}
        >
          <AutoSizer>
            {({ height, width }) => (
              <List
                containerTagName="svg"
                height={height}
                itemCount={this.props.data.maxDepth}
                itemData={this.getItemData(
                  this.props.data,
                  this.state.focusedNode,
                  this.focusNode,
                  width,
                )}
                itemSize={rowHeight}
                width={width}
              >
                {ItemRenderer}
              </List>
            )}
          </AutoSizer>
        </div>
      </Fragment>
    );
  }

  focusNode = node => this.setState({ focusedNode: node });
}
