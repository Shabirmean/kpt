// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package commands

import (
	"context"
	"os"

	"github.com/GoogleContainerTools/kpt/internal/cmdplan"
	"github.com/GoogleContainerTools/kpt/internal/docs/generated/livedocs"
	"github.com/spf13/cobra"
	"k8s.io/cli-runtime/pkg/genericclioptions"
)

func GetAlphaLiveCommand(ctx context.Context, _, version string) *cobra.Command {
	liveCmd := &cobra.Command{
		Use:   "live",
		Short: "[Alpha] " + livedocs.LiveShort,
		Long:  "[Alpha] " + livedocs.LiveShort + "\n" + livedocs.LiveLong,
	}

	ioStreams := genericclioptions.IOStreams{
		In:     os.Stdin,
		Out:    os.Stdout,
		ErrOut: os.Stderr,
	}

	f := newFactory(liveCmd, version)

	planCmd := cmdplan.NewCommand(ctx, f, ioStreams)
	liveCmd.AddCommand(planCmd)

	return liveCmd
}
