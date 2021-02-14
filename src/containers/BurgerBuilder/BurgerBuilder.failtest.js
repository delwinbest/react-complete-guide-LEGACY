import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { Provider } from 'react-redux';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Provider><BurgerBuilder onInitIngredients={() => {}}  /></Provider>);
    });

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ ings: { salad:0, meatq: 1 }});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});