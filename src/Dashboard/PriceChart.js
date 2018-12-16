import React from 'react';
import ReactHighcharts from 'react-highcharts';
import highchartsConfig from './HighchartsConfig';
import HighchartsTheme from './HighchartsTheme';
import ChartSelect from './ChartSelect';
import { Tile } from '../Shared/Tile';
import { Spinner } from '../Shared/Content';
import { AppContext } from '../App/AppProvider';

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default () => (
	<AppContext.Consumer>
		{({ historical, changeChartSelect }) => (
			<Tile>
				<ChartSelect
					defaultValue="months"
					onChange={e => changeChartSelect(e.target.value)}>
					<option value="days"> Days </option>
					<option value="weeks"> Weeks </option>
					<option value="months"> Months </option>
				</ChartSelect>

				{historical ? (
					<ReactHighcharts config={highchartsConfig(historical)} />
				) : (
					<Spinner />
				)}
			</Tile>
		)}
	</AppContext.Consumer>
);
