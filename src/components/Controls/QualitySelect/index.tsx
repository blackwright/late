import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Actions from '../../../store/actions';
import { StoreState, Quality } from '../../../store/types';
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

const QualitySelect: React.FC<Props> = ({
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
      <select
        value={quality}
        onChange={e => setQuality(+e.target.value as Quality)}
      >
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
  setQuality: (quality: Quality) => dispatch(Actions.setQuality(quality))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QualitySelect);
