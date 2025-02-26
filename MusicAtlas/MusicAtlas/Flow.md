# Algorithmic flow (and change of states)

## Regular flow

1. Query all Accepted into a List.
1. Iterate over each Artist.
1. Update information for each Artist.
1. Get a List of related Artists for the current Artist.
1. Insert all non-duplicate related Artists as New.
1. Once done, mark the iterated Artist as Processed.
1. After the cycle, export a CSV with all New Artists.

## Seed flow

1. Get the information for the Seed Artist.
1. Insert the Seed Artist as Accepted.
1. Continue with Regular flow.

## Manually update CSV flow

1. Review each New Artist.
1. If not relevant, mark as Refused.
1. If duplicate, mark as Duplicate and add link to Parent Artist.
1. If OK, mark as Accepted and add Apple link.
1. If adding additional details, set WithDetails to True.

## Process Import CSV

1. Go over the the imported CSV and process each Artist based on the set state.

### Process Refused
1. Mark the Artist as Refused.

### Process Duplicate
1. Delete the Artist record.
1. Re-link the Spotify details to the Parent Artist.

### Process Accepted
1. Mark the Artist as Accepted.
1. Run the Regular flow.