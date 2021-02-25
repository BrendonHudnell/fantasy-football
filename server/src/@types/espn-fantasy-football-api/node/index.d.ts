declare module 'espn-fantasy-football-api/node' {
	export type PlayerAvailabilityStatus = 'FREEAGENT' | 'ONTEAM' | 'WAIVERS';

	export type InjuryStatus =
		| 'ACTIVE'
		| 'BEREAVEMENT'
		| 'DAY_TO_DAY'
		| 'DOUBTFUL'
		| 'FIFTEEN_DAY_DL'
		| 'INJURY_RESERVE'
		| 'OUT'
		| 'PATERNITY'
		| 'PROBABLE'
		| 'QUESTIONABLE'
		| 'SEVEN_DAY_DL'
		| 'SIXTY_DAY_DL'
		| 'SUSPENSION'
		| 'TEN_DAY_DL';

	export type DraftType =
		| 'OFFLINE'
		| 'SNAKE'
		| 'AUTOPICK'
		| 'SNAIL'
		| 'AUCTION';

	export type LineupLockTimeType =
		| 'INDIVIDUAL_GAME'
		| 'FIRSTGAME_SCORINGPERIOD';

	export class Client {
		constructor(options: { leagueId: number; espnS2?: string; SWID?: string });

		getBoxscoreForWeek(options: {
			seasonId: number;
			matchupPeriodId: number;
			scoringPeriodId: number;
		}): Promise<Array<Boxscore>>;

		getHistoricalScoreboardForWeek(options: {
			seasonId: number;
			matchupPeriodId: number;
			scoringPeriodId: number;
		}): Promise<Array<Boxscore>>;

		getLeagueInfo(options: { seasonId: number }): Promise<League>;

		getTeamsAtWeek(options: {
			seasonId: number;
			scoringPeriodId: number;
		}): Promise<Array<Team>>;
	}

	export interface Boxscore {
		homeScore: number;
		homeTeamId: number;
		homeRoster: Array<BoxscorePlayer>;
		awayScore: number;
		awayTeamId: number;
		awayRoster: Array<BoxscorePlayer>;
	}

	export interface BoxscorePlayer {
		player: Player;
		position: string;
		totalPoints: number;
		pointBreakdown: PlayerStats;
		rawStats: PlayerStats;
	}

	export interface Player {
		id: number;
		firstName: string;
		lastName: string;
		fullName: string;
		jerseyNumber: number;
		proTeam: string;
		proTeamAbbreviation: string;
		defaultPosition: string;
		eligiblePositions: Array<string>;
		averageDraftPosition: number;
		averageAuctionValue: number;
		percentChange: number;
		percentStarted: number;
		percentOwned: number;
		acquiredDate: Date;
		availabilityStatus: PlayerAvailabilityStatus;
		isDroppable: boolean;
		isInjured: boolean;
		injuryStatus: InjuryStatus;
	}

	export interface PlayerStats {
		passingYards: number;
		passingTouchdowns: number;
		passing2PtConversion: number;
		passingInterceptions: number;
		rushingYards: number;
		rushingTouchdowns: number;
		rushing2PtConversions: number;
		receivingYards: number;
		receivingTouchdowns: number;
		receiving2PtConversions: number;
		receivingReceptions: number;
		lostFumbles: number;
		madeFieldGoalsFrom50Plus: number;
		madeFieldGoalsFrom40To49: number;
		madeFieldGoalsFromUnder40: number;
		missedFieldGoals: number;
		madeExtraPoints: number;
		missedExtraPoints: number;
		defensive0PointsAllowed: number;
		defensive1To6PointsAllowed: number;
		defensive7To13PointsAllowed: number;
		defensive14To17PointsAllowed: number;
		defensive28To34PointsAllowed: number;
		defensive35To45PointsAllowed: number;
		defensiveBlockedKickForTouchdowns: number;
		defensiveInterceptions: number;
		defensiveFumbles: number;
		defensiveBlockedKicks: number;
		defensiveSafeties: number;
		defensiveSacks: number;
		kickoffReturnTouchdown: number;
		puntReturnTouchdown: number;
		fumbleReturnTouchdown: number;
		interceptionReturnTouchdown: number;
		defensive100To199YardsAllowed: number;
		defensive200To299YardsAllowed: number;
		defensive350To399YardsAllowed: number;
		defensive400To449YardsAllowed: number;
		defensive450To499YardsAllowed: number;
		defensive500To549YardsAllowed: number;
		defensiveOver550YardsAllowed: number;
	}

	export interface League {
		name: string;
		size: number;
		isPublic: boolean;
		draftSettings: DraftSettings;
		rosterSettings: RosterSettings;
		scheduleSettings: ScheduleSettings;
	}

	export interface DraftSettings {
		date: Date;
		type: DraftType;
		timePerPick: number;
		canTradeDraftPicks: boolean;
	}

	export interface RosterSettings {
		lineupPositionCount: { [key: string]: number };
		positionLimits: { [key: string]: number };
		locktime: LineupLockTimeType;
	}

	export interface ScheduleSettings {
		numberOfRegularSeasonMatchups: number;
		regularSeasonMatchupLength: number;
		numberOfPlayoffMatchups: number;
		playoffMatchupLength: number;
		numberOfPlayoffTeams: number;
	}

	export interface Team {
		leagueId: number;
		seasonId: number;
		id: number;
		logoURL: string;
		roster: Array<Player>;
		wins: number;
		losses: number;
		ties: number;
		divisionWins: number;
		divisionLosses: number;
		divisionTies: number;
		homeWins: number;
		homeLosses: number;
		homeTies: number;
		awayWins: number;
		awayLosses: number;
		awayTies: number;
		totalPointsScored: number;
		regularSeasonPointsFor: number;
		regularSeasonPointsAgainst: number;
		winPercentage: number;
		playoffSeed: number;
		finalStandingsPosition: number;
	}
}
