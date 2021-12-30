#### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

##### Answer

We can create a class component extending from React.Component or React.PureComponent. The main difference is that a PureComponent is not re-rendered if the props or the state haven't changed, this component only depends on its own props and state to re-render.

It could break an app if we don't use the spread opetaror when we work with objects or arrays, for example:

```js
// Let's define the following state
this.state = { numbers: [1, 2, 3, 4, 5] };

// Let's try to change the state
this.setState({ numbers: this.state.numbers.push(6) });

//If we work with a PureComponent, the change before will not be reflected in the interface, so we should do the following
this.setState({ numbers: [...this.state.numbers, 6] });
```

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

##### Answer

If we have `shouldComponentUpdate` implemented in a component which is a context consumer, this will be skipped if the provider's value changes. This means, that it will be re-rendered, ignoring `shouldComponentUpdate`, causing incorrect behaviours in our app.

#### 3. Describe 3 ways to pass information from a component to its PARENT.

##### Answer

- Passing `setState` as a prop, so the child will be able to update the information corresponding to its parent:

```js
const Parent = () => {
  const [name, setName] = useState("");

  return <Child setName={setName} />;
};
```

- Pass a function through `context` so the consumers will be able to update the context, similar to the previous example, we can pass a function which implements the setState method, but, this time using context.

- Using `redux`, so the parent component will be able to get the new data that could be updated by an action dispatched by a child component.

#### 4. Give 2 ways to prevent components from re-rendering.

##### Answer

- Extending from `React.PureComponent` to re-render only if state or props have changed.
- Using `React.memo` to re-render only if props have changed.

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

##### Answer

A fragment allows us to group components without adding a node to the DOM, for example:

```js
<>
  <Name />
  <LastName />
</>
```

A problem could be when we use map to iterate an array to show a list of components, it is important to use the key attribute, but it only works with React.Fragment, and not with the short syntax:

```js
{
  people.map((person) => (
    <React.Fragment key={person.id}>{person.name}</React.Fragment>
  ));
}
```

#### 6. Give 3 examples of the HOC pattern.

##### Answer

- Creating a HOC with `connect` from redux:

```js
export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

- Creating a HOC with `withStyles`from material-ui:

```js
export default withStyles(styles)(MyComponent);
```

- Creating a HOC with `apollo client`:

```js
export default graphql(gql`
  query MyQuery {
    person {
      id
    }
  }
`)(MyComponent);
```

#### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

##### Answer

- Promises:

```js
myPromise()
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
```

- Async/await:

```js
const getName = async () => {
  try {
    return await something();
  } catch (e) {
    console.log(e);
  }
};
```

#### 8. How many arguments does setState take and why is it async.

##### Answer

- `setState` accepts two arguments, the first one is used to update the state, and the second one is a callback that will be executed once the state is uptated and the component is re-rendered:

```js
this.setState({ name: "New Name" }, () => {
  console.log("Name updated");
});
```

- `setState` is async because of optimization, it groups many calls and applies a single update for performance.

#### 9. List the steps needed to migrate a Class to Function Component.

##### Answer

- Change the `class` declaration to `function` and remove the extension from React.Component.
- Create the state variables if needed using the `useState` hook.
- Remove constructor.
- Delete the word `this`.
- Add `useEffect` hook if needed replacing componentDidMount, componentDidUpdate, componentWillUnmount.
- Manage props as function argument.
- Move the content of render() to the function body.
- Convert class methods to functions.

#### 10. List a few ways styles can be used with components.

##### Answer

- Using `styled-components`:

```js
const StyledDiv = styled.div`
  background-color: white;
`;
```

- Using the `style` attribute:

```js
const myStyle = { backgroundColor: "white" };

return <div style={myStyle}>Hello</div>;
```

- Using `css` and `className`:

```css
.my-div {
  background-color: white;
}
```

```js
return <div className="my-div">Hello</div>;
```

#### 11. How to render an HTML string coming from the server.

##### Answer

Using `html-react-parser`, this library helps us to convert html string to React elements:

```js
import parse from "html-react-parser";

parse("<p>This is an HTML string</p>");
```
