import * as React from 'react';
import { connect } from 'react-redux';
import * as uuid from 'uuid/v4';
import { ProgramConfiguration } from './interfaces';
import * as Ducks from './ducks';

export interface ProgramProps {
  closeProgramByWindowId: Function;
  closeProgramByProgramId: Function;
  openProgram: Function;
}

type HOC<PWrapped, PHoc> = React.ComponentClass<PWrapped & PHoc> | React.SFC<PWrapped & PHoc>;

function asProgram(config: ProgramConfiguration) {
  return <P, S>(WrappedComponent: HOC<P, ProgramProps>) => {
    class Program extends React.Component<P & ProgramProps, S> {
      render(): JSX.Element {
        return <WrappedComponent {...this.props} />;
      }
    }

    const mapDispatchToProps = (dispatch: Function, props: ProgramProps): ProgramProps => ({
      closeProgramByWindowId: (id: string) => Ducks.closeProgramByWindowId({ windowId: id }),
      closeProgramByProgramId: (id: number) => Ducks.closeProgramByProgramId({ programId: id }),
      openProgram: (id: number) =>
        Ducks.openProgram({
          programId: id,
          windowId: uuid(),
          allowMultipleInstances: config.allowMultipleInstances,
        }),
    });

    return connect(null, mapDispatchToProps)(Program);
  };
}

export default asProgram;
