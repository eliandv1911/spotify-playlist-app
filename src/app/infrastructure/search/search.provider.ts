import { SEARCH_PORT } from "../../domain/ports/search.port";
import { SearchAdapter } from "./search.adapter";

/**
 * Provider array that binds the SEARCH_PORT abstraction
 * to its concrete implementation SearchAdapter.
 * 
 * @author Elian.Diaz
 */
export const SEARCH_PROVIDERS = [
  {
    provide: SEARCH_PORT,
    useClass: SearchAdapter
  }
];
