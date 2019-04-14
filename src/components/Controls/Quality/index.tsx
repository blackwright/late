import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Actions from '../../../store/actions';
import { StoreState } from '../../../store/types';
import './Quality.scss';

type Props = {
  setIsQualityHovered: (isQualityHovered: boolean) => void;
} & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const qualities = [
  { label: 'low', value: 0 },
  { label: 'medium', value: 1 },
  { label: 'high', value: 2 }
];

const Quality: React.FunctionComponent<Props> = ({
  quality,
  setQuality,
  setIsQualityHovered
}) => {
  return (
    <div
      id="quality"
      onMouseEnter={() => setIsQualityHovered(true)}
      onMouseLeave={() => setIsQualityHovered(false)}
    >
      <select value={quality} onChange={e => setQuality(+e.target.value)}>
        {qualities.map(quality => (
          <option key={quality.label} value={quality.value}>
            {quality.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = (state: StoreState) => ({
  quality: state.quality
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setQuality: (quality: number) => dispatch(Actions.setQuality(quality))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quality);
