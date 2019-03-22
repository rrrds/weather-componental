import { parseJSX } from '../src/js/Framework/Template';
import { createElement } from '../src/js/Framework/jsx';
import ComponentFactory from '../src/js/Framework/ComponentFactory';

test('simple', () => {
  const data = { data: 111 };

  expect(parseJSX`<div data={${data}}></div>`).toEqual([
    createElement('div', {
      data: {
        data: 111
      }
    })
  ]);
});

test('simple2', () => {
  const data = { data: 111 };
  const text = 'text';
  const Header = function() {};
  ComponentFactory.register(Header);

  expect(parseJSX`
    <div data={${data}}>
      <Header data={${data}} class={class} />
      <ul>
        <li>${text}</li>
      </ul>
    </div>`).toEqual([
    createElement(
      'div',
      {
        data: {
          data: 111
        }
      },
      createElement(Header, {
        data: {
          data: 111
        },
        class: 'class'
      }),
      createElement('ul', {}, createElement('li', {}, 'text'))
    )
  ]);
});
