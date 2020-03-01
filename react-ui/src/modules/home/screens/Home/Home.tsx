import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from 'types/state';

interface Props {
  dispatch: Dispatch;
  count: number;
}

export const HomeScreen: React.FunctionComponent<Props> = ({
  count,
}: Props) => {
  return <div>{count}</div>;
};

const mapStateToProps = (state: StoreState) => ({
  count: state.home.count,
});

export default connect(mapStateToProps)(HomeScreen);
