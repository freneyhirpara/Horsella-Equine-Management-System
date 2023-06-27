import { combineReducers } from "redux";
import breedingreducer from "./Admin/Breeding/BreedingReducer";
import trainingreducer from "./Admin/Training/TrainingReducer";
import racereducer from "./Admin/Trotting/RaceReducer";
import reducer from "./User/UserReducer";
import contactreducer from "./Contact/ContactReducer";
import horsereducer from "./Horse/HorseReducer";
import journalreducer from './Journal/JournalReducer';

const rootReducer = combineReducers({
  user: reducer,
  breedingreducer: breedingreducer,
  trainingreducer: trainingreducer,
  racereducer: racereducer,
  horsereducer: horsereducer,
  contactreducer: contactreducer,
  journalreducer: journalreducer,
});

export default rootReducer;
