import { parse, stringify } from '../src/js/Framework/Template';
import { createElement } from '../src/js/Framework/jsx';

test('simple', () => {
  expect(parse(`<div></div><Component />`)).toEqual([
    {
      tag: 'div',
      selfClosed: false,
      customComponent: false,
      props: {},
      children: []
    },
    {
      tag: 'Component',
      selfClosed: true,
      customComponent: true,
      props: {},
      children: []
    }
  ]);
});

test('simple with class', () => {
  expect(
    parse(`
    <div class={'test'}>
      <Component class={'green'} />
    </div>`)
  ).toEqual([
    {
      tag: 'div',
      selfClosed: false,
      customComponent: false,
      props: {
        class: `'test'`
      },
      children: [
        {
          tag: 'Component',
          selfClosed: true,
          customComponent: true,
          props: {
            class: `'green'`
          },
          children: []
        }
      ]
    }
  ]);
});

test('with class and child', () => {
  expect(
    parse(`<div class={'test'} data={this.props.data}>test</div>`)
  ).toEqual([
    {
      tag: 'div',
      selfClosed: false,
      customComponent: false,
      props: {
        class: `'test'`,
        data: 'this.props.data'
      },
      children: [
        {
          textNode: true,
          content: 'test'
        }
      ]
    }
  ]);
});

test('with class and multichild', () => {
  expect(
    parse(`
      <div class={'test'}>
        <ul>
          <li>1</li>
        </ul>
        <p>test2</p>
      </div>`)
  ).toEqual([
    {
      tag: 'div',
      selfClosed: false,
      customComponent: false,
      props: {
        class: `'test'`
      },
      children: [
        {
          tag: 'ul',
          selfClosed: false,
          customComponent: false,
          props: {},
          children: [
            {
              tag: 'li',
              selfClosed: false,
              customComponent: false,
              props: {},
              children: [
                {
                  textNode: true,
                  content: '1'
                }
              ]
            }
          ]
        },
        {
          tag: 'p',
          selfClosed: false,
          customComponent: false,
          props: {},
          children: [
            {
              textNode: true,
              content: 'test2'
            }
          ]
        }
      ]
    }
  ]);
});

test('stringify', () => {
  expect(
    stringify(
      parse(`
      <div class={'test'}>
        <ul>
          <li>1</li>
        </ul>
        <p>test2</p>
      </div>`)
    )
  ).toEqual(
    `createElement('div', {class: 'test'}, createElement('ul', {}, createElement('li', {}, '1')), createElement('p', {}, 'test2'))`
  );
});

test('stringify2', () => {
  expect(
    stringify(parse(`<div class={'test'} data={this.props.data}>test</div>`))
  ).toEqual(
    `createElement('div', {class: 'test', data: this.props.data}, 'test')`
  );
});

test('createElement', () => {
  const fn = createElement;
  const Component = function() {};

  expect(
    eval(
      '[' +
        stringify(
          parse(`
          <div class={'test'} data={'this.props.data'}>test</div>
          <Component />`),
          'fn'
        ) +
        ']'
    )
  ).toEqual([
    {
      tag: 'div',
      props: { class: 'test', data: 'this.props.data' },
      classList: 'test',
      children: ['test'],
      events: []
    },
    {
      tag: Component,
      props: {},
      classList: [],
      children: [],
      events: []
    }
  ]);
});
