import {
  CircularProgress,
  createStyles,
  Grid,
  Popover,
  Tab,
  Tabs,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import theme from '../../../../../shared/src/theme/altinnStudioTheme';
import AppReleaseActions from '../../../sharedResources/appRelease/appReleaseDispatcher';
import { IAppReleaseState } from '../../../sharedResources/appRelease/appReleaseReducer';
import { BuildStatus, IRelease } from '../../../sharedResources/appRelease/types';
import RepoStatusActionDispatchers from '../../../sharedResources/repoStatus/repoStatusDispatcher';
import { IRepoStatusState } from '../../../sharedResources/repoStatus/repoStatusReducer';
import FetchLanguageActionDispatchers from '../../../utils/fetchLanguage/fetchLanguageDispatcher';
import { getGitCommitLink, getRepoStatusUrl, languageUrl } from '../../../utils/urlHelper';
import HandleMergeConflictActionDispatchers from '../../handleMergeConflict/handleMergeConflictDispatcher';
import { IHandleMergeConflictState } from '../../handleMergeConflict/handleMergeConflictReducer';
import ReleaseComponent from '../components/appReleaseComponent';
import CreateReleaseComponent from '../components/createAppReleaseComponent';

interface IStyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles(createStyles({
  scroller: {
    maxHeight: '3.7rem',
  },
  indicator: {
    'display': 'flex',
    'justifyContent': 'center',
    'backgroundColor': 'transparent',
    'textTransform': 'none',
    'minHeight': 0,
    '& > div': {
      width: '70%',
      borderBottom: `2px solid ${theme.altinnPalette.primary.blue}`,
    },
  },
  flexContainer: {
    borderBottom: `1px solid ${theme.altinnPalette.primary.greyMedium}`,
  },
}))((props: IStyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(createStyles({
  root: {
    'minHeight': 0,
    'textTransform': 'none',
    'width': 'wrap',
    '&:focus': {
      outline: 0,
      color: theme.altinnPalette.primary.blue,
    },
    'paddingBottom': 0,
    'paddingLeft': '1.8rem',
    'paddingRight': '1.8rem',
    'minWidth': 0,
  },
  wrapper: {
    fontSize: '1.6rem',
  },
}))(Tab);

const styles = createStyles({
  appReleaseWrapper: {
    maxWidth: '78.6rem',
    minWidth: '24.6rem',
    background: 'white',
    borderLeft: `1px solid ${theme.altinnPalette.primary.greyMedium}`,
    borderBottom: `1px solid ${theme.altinnPalette.primary.greyMedium}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  appReleaseTabs: {
    flexGrow: 1,
  },
  appReleaseCreateRelease: {
    flexGrow: 1,
  },
  appReleaseHistory: {
    flexGrow: 1,
    maxHeight: 500,
    overflowY: 'scroll',
  },
  appReleaseHistoryTitle: {
    fontSize: '1.8rem',
    fontWeight: 500,
    padding: '2rem 1.2rem 2rem 1.2rem',
  },
  appCreateReleaseWrapper: {
    minHeight: '400px',
  },
  appCreateReleaseTitle: {
    padding: '1.2rem',
    fontWeight: 500,
    fontSize: '1.8rem',
  },
  appCreateReleaseStatusIcon: {
    padding: '1.2rem',
    color: theme.altinnPalette.primary.blue,
  },
  popover: {
    pointerEvents: 'none',
  },
  popoverPaper: {
    padding: '2rem',
    backgroundColor: theme.altinnPalette.primary.yellowLight,
  },
});

export interface IAppReleaseContainer extends WithStyles<typeof styles> { }

function AppReleaseContainer(props: IAppReleaseContainer) {
  const { classes } = props;
  const [tabIndex, setTabIndex] = React.useState(0);
  const [anchorElement, setAchorElement] = React.useState<Element>();

  const [popoverOpenClick, setPopoverOpenClick] = React.useState<boolean>(false);
  const [popoverOpenHover, setPopoverOpenHover] = React.useState<boolean>(false);

  const appReleases: IAppReleaseState = useSelector((state: IServiceDevelopmentState) => state.appReleases);
  const repoStatus: IRepoStatusState = useSelector((state: IServiceDevelopmentState) => state.repoStatus);
  const handleMergeConflict: IHandleMergeConflictState =
    useSelector((state: IServiceDevelopmentState) => state.handleMergeConflict);
  const language: any = useSelector((state: IServiceDevelopmentState) => state.language);

  React.useEffect(() => {
    const { org, app } = window as Window as IAltinnWindow;
    AppReleaseActions.getAppReleasesIntervalStart();
    if (!language) {
      FetchLanguageActionDispatchers.fetchLanguage(languageUrl, 'nb');
    }
    RepoStatusActionDispatchers.getMasterRepoStatus(org, app);
    HandleMergeConflictActionDispatchers.fetchRepoStatus(getRepoStatusUrl(), org, app);
    return () => {
      AppReleaseActions.getAppReleasesIntervalStop();
    };
  }, []);

  function handleChangeTabIndex(event: React.ChangeEvent<{}>, value: number) {
    setTabIndex(value);
  }

  function handlePopoverKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      if (!anchorElement) {
        setAchorElement(event.currentTarget);
      }
      setPopoverOpenClick(!popoverOpenClick);
    }
  }

  function handlePopoverOpenClicked(event: React.MouseEvent) {
    if (!anchorElement) {
      setAchorElement(event.currentTarget);
    }
    setPopoverOpenClick(!popoverOpenClick);
  }

  function handlePopoverOpenHover(event: React.MouseEvent) {
    setAchorElement(event.currentTarget);
    setPopoverOpenHover(true);
  }

  function handlePopoverClose() {
    if (popoverOpenHover) {
      setPopoverOpenHover(!popoverOpenHover);
    }
  }

  function renderCreateRelease() {
    if (!repoStatus.branch.master || !handleMergeConflict.repoStatus.contentStatus) {
      return (
        <Grid
          container={true}
          direction={'column'}
          justify={'center'}
        >
          <Grid
            container={true}
            direction={'row'}
            justify={'center'}
          >
            <Grid
              container={true}
              direction={'column'}
              justify={'space-evenly'}
              style={{
                padding: '2rem',
              }}
            >
              <Grid item={true}>
                <CircularProgress
                  style={{
                    color: theme.altinnPalette.primary.blue,
                  }}
                />
              </Grid>
              <Grid item={true}>
                <Typography
                  style={{
                    padding: '1.2rem',
                  }}
                >
                  {
                    !!language &&
                      !!language.app_release &&
                      !!language.app_release.check_status ?
                      language.app_release.check_status :
                      'language.app_release.check_status'
                  }
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      );
    }
    if (
      !handleMergeConflict.repoStatus ||
      !repoStatus.branch.master
    ) {
      return null;
    }
    // Check if latest
    if (
      !!appReleases.releases[0] &&
      appReleases.releases[0].build.status !== BuildStatus.completed
    ) {
      return null;
    }
    if (
      !!appReleases.releases[0] &&
      appReleases.releases[0].targetCommitish === repoStatus.branch.master.commit.id
    ) {
      return null;
    }
    if (
      !!appReleases.releases[0] &&
      appReleases.releases[0].build.status !== BuildStatus.completed
    ) {
      return null;
    }
    if (appReleases.creatingRelease) {
      return null;
    }

    return (
      <CreateReleaseComponent />
    );
  }

  function renderStatusIcon() {
    if (!repoStatus.branch.master || !handleMergeConflict.repoStatus.contentStatus) {
      return null;
    }
    if (!!handleMergeConflict.repoStatus.contentStatus && !!handleMergeConflict.repoStatus.contentStatus) {
      return (
        <i
          className={'ai ai-info-circle'}
        />
      );
    } else if (!!handleMergeConflict.repoStatus.aheadBy) {
      return (
        <i
          className={'ai ai-info-circle'}
        />
      );
    } else {
      return null;
    }
  }

  function renderStatusMessage() {
    if (
      !!!repoStatus.branch.master ||
      !!!appReleases.releases ||
      !!!handleMergeConflict.repoStatus.contentStatus
    ) {
      return null;
    }
    if (repoStatus.branch.master.commit.id === appReleases.releases[0].targetCommitish) {
      return (
        <Typography>
          {
            !!language &&
              !!language.app_create_release &&
              !!language.app_create_release.local_changes_cant_build ?
              language.app_create_release.local_changes_cant_build :
              'language.app_create_release.local_changes_cant_build'
          }
        </Typography>
      );
    } else if (!!handleMergeConflict.repoStatus.contentStatus) {
      return (
        <Typography>
          {
            !!language &&
              !!language.app_create_release &&
              !!language.app_create_release.local_changes_can_build ?
              language.app_create_release.local_changes_can_build :
              'language.app_create_release.local_changes_can_build'
          }
        </Typography>
      );
    }
    return null;
  }

  return (
    <>
      <Grid
        container={true}
        direction={'column'}
        className={classes.appReleaseWrapper}
      >
        <Grid
          item={true}
          className={classes.appReleaseTabs}
        >
          <StyledTabs value={tabIndex} onChange={handleChangeTabIndex}>
            <StyledTab
              label={
                !!language &&
                  !!language.app_release &&
                  !!language.app_release.release_tab_versions ?
                  language.app_release.release_tab_versions :
                  'language.app_release.release_tab_versions'
              }
            />
          </StyledTabs>
        </Grid>

        <Grid
          container={true}
          direction={'column'}
          className={classes.appCreateReleaseWrapper}
        >
          <Grid
            container={true}
            direction={'row'}
            justify={'space-between'}
          >
            <Grid
              item={true}
            >
              <Typography className={classes.appCreateReleaseTitle}>
                {!!repoStatus.branch.master && !!repoStatus.branch.master.commit &&
                  appReleases.releases[0].targetCommitish === repoStatus.branch.master.commit.id &&
                  !!!handleMergeConflict.repoStatus.contentStatus ?
                  <>
                    {
                      !!language &&
                        !!language.general &&
                        !!language.general.version ?
                        language.general.version :
                        'language.general.version'
                    }
                    {appReleases.releases[0].tagName}
                    {
                      !!language &&
                        !!language.general &&
                        !!language.general.contains ?
                        language.general.contains :
                        'language.general.contains'
                    }
                    {!!repoStatus.branch.master && !!repoStatus.branch.master ?
                      <a href={getGitCommitLink(repoStatus.branch.master.commit.id)}>
                        {
                          !!language &&
                            !!language.app_release &&
                            !!language.app_release.release_title_link ?
                            language.app_release.release_title_link :
                            'language.app_release.release_title_link'
                        }
                      </a> :
                      null
                    }
                  </>
                  :
                  <>
                    {!!language &&
                      !!language.app_release &&
                      !!language.app_release.release_title ?
                      language.app_release.release_title :
                      'language.app_release.release_title'
                    }
                    {!!repoStatus.branch.master && !!repoStatus.branch.master ?
                      <a href={getGitCommitLink(repoStatus.branch.master.commit.id)} target={'_blank'}>
                        {
                          !!language &&
                            !!language.app_release &&
                            !!language.app_release.release_title_link ?
                            language.app_release.release_title_link :
                            'language.app_release.release_title_link'
                        }
                      </a> :
                      null
                    }
                  </>
                }
              </Typography>
            </Grid>
            <Grid
              item={true}
              className={classes.appCreateReleaseStatusIcon}
              onClick={handlePopoverOpenClicked}
              onMouseOver={handlePopoverOpenHover}
              onMouseLeave={handlePopoverClose}
              tabIndex={0}
              onKeyPress={handlePopoverKeyPress}
            >
              {renderStatusIcon()}
            </Grid>
          </Grid>
          <Grid
            item={true}
            className={classes.appReleaseCreateRelease}
          >
            {renderCreateRelease()}
          </Grid>
        </Grid>
        <Grid
          item={true}
        >
          <Typography
            className={classes.appReleaseHistoryTitle}
          >
            {
              !!language &&
                !!language.app_release &&
                !!language.app_release.earlier_releases ?
                language.app_release.earlier_releases :
                'language.app_release.earlier_releases'
            }
          </Typography>
        </Grid>
        <Grid
          item={true}
          className={classes.appReleaseHistory}
        >
          {appReleases.releases.map((release: IRelease, index: number) => (
            <ReleaseComponent key={index} release={release} />
          ))}
        </Grid>
      </Grid>
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.popoverPaper,
        }}
        anchorEl={anchorElement}
        open={(popoverOpenClick || popoverOpenHover)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
      >
        {renderStatusMessage()}
      </Popover>
    </>
  );
}

export default withStyles(styles)(AppReleaseContainer);
